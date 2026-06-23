-- ATHLON AI -- Full Database Schema
-- Supabase PostgreSQL Migration

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================
-- USERS & PROFILES
-- ===========================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('athlete','coach','psychologist','fitness_coach','team_manager','selector','admin')),
  avatar_url TEXT,
  sport TEXT DEFAULT 'Multi-Sport',
  team_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- TEAMS
-- ===========================
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  organization TEXT,
  coach_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  jersey_number INT,
  position TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- ===========================
-- ASSESSMENTS (Module 1)
-- ===========================
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('daily_mood', 'pre_match', 'post_match', 'weekly')),
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  duration_seconds INT,
  session_notes TEXT
);

CREATE TABLE IF NOT EXISTS assessment_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  dimension TEXT NOT NULL, -- mood, stress, confidence, focus, anxiety, motivation, resilience
  score NUMERIC(4,1) NOT NULL CHECK (score BETWEEN 0 AND 10),
  text_response TEXT,
  ai_interpreted_score NUMERIC(4,1)
);

CREATE TABLE IF NOT EXISTS mental_fitness_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id),
  mfs NUMERIC(5,1) NOT NULL CHECK (mfs BETWEEN 0 AND 100),
  readiness_level TEXT CHECK (readiness_level IN ('Excellent', 'Good', 'Moderate', 'Needs Attention', 'Critical')),
  strength_areas TEXT[],
  improvement_areas TEXT[],
  shap_values JSONB,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- MATCH READINESS (Module 2)
-- ===========================
CREATE TABLE IF NOT EXISTS match_readiness (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  match_date DATE NOT NULL,
  opponent TEXT,
  mental_score NUMERIC(4,1),
  sleep_quality NUMERIC(4,1),
  recovery_score NUMERIC(4,1),
  training_workload NUMERIC(4,1),
  injury_status BOOLEAN DEFAULT FALSE,
  readiness_pct NUMERIC(5,1),
  risk_factors JSONB,
  model_used TEXT DEFAULT 'XGBoost',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- BURNOUT RISK (Module 3)
-- ===========================
CREATE TABLE IF NOT EXISTS burnout_risk (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  risk_score NUMERIC(5,1) NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
  risk_level TEXT CHECK (risk_level IN ('Low', 'Moderate', 'High', 'Critical')),
  training_load NUMERIC(4,1),
  match_frequency INT,
  recovery_quality NUMERIC(4,1),
  mood_trend NUMERIC(4,1),
  sleep_quality NUMERIC(4,1),
  stress_index NUMERIC(4,1),
  trend_direction TEXT CHECK (trend_direction IN ('improving', 'stable', 'worsening')),
  recommendations TEXT[],
  evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- JOURNALS (Module 4)
-- ===========================
CREATE TABLE IF NOT EXISTS journals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  mood_emoji TEXT,
  tags TEXT[],
  is_voice_entry BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journal_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_id UUID NOT NULL REFERENCES journals(id) ON DELETE CASCADE,
  sentiment_score NUMERIC(4,3) CHECK (sentiment_score BETWEEN -1 AND 1),
  dominant_emotion TEXT,
  emotion_breakdown JSONB,
  detected_themes TEXT[],
  crisis_flag BOOLEAN DEFAULT FALSE,
  model_used TEXT DEFAULT 'RoBERTa',
  analyzed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- SLEEP & RECOVERY (Module 10)
-- ===========================
CREATE TABLE IF NOT EXISTS sleep_recovery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  sleep_duration_hours NUMERIC(4,1),
  sleep_quality_score NUMERIC(5,1),
  recovery_score NUMERIC(5,1),
  hrv_ms NUMERIC(6,1),
  resting_hr INT,
  steps INT,
  source TEXT DEFAULT 'manual', -- fitbit, garmin, apple_health, google_fit, manual
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(athlete_id, date)
);

-- ===========================
-- COGNITIVE TESTS (Module 7)
-- ===========================
CREATE TABLE IF NOT EXISTS cognitive_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL CHECK (test_type IN ('reaction_time', 'focus', 'memory', 'decision_making')),
  score NUMERIC(6,1),
  raw_results JSONB,
  cognitive_readiness_score NUMERIC(5,1),
  taken_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- INJURY RISK (Module 9)
-- ===========================
CREATE TABLE IF NOT EXISTS injury_risk (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  risk_percentage NUMERIC(5,1),
  recovery_readiness NUMERIC(5,1),
  training_workload NUMERIC(4,1),
  sleep_quality NUMERIC(4,1),
  mental_fatigue_score NUMERIC(4,1),
  previous_injury_count INT DEFAULT 0,
  recommendations TEXT[],
  model_used TEXT DEFAULT 'Random Forest',
  evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- INTERVENTIONS (Module 12)
-- ===========================
CREATE TABLE IF NOT EXISTS interventions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  prescribed_by UUID REFERENCES users(id),
  type TEXT NOT NULL, -- meditation, breathing, visualization, counseling, recovery
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INT,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  compliance_rating INT CHECK (compliance_rating BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- TEAM SURVEYS (Module 11)
-- ===========================
CREATE TABLE IF NOT EXISTS team_surveys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id),
  created_by UUID REFERENCES users(id),
  title TEXT NOT NULL,
  questions JSONB NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE,
  closes_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS team_climate (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id),
  survey_id UUID REFERENCES team_surveys(id),
  overall_morale NUMERIC(5,1),
  cohesion_score NUMERIC(5,1),
  communication_health NUMERIC(5,1),
  leadership_confidence NUMERIC(5,1),
  conflict_indicators TEXT[],
  sentiment_analysis JSONB,
  analyzed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- CRISIS ALERTS (Module 14)
-- ===========================
CREATE TABLE IF NOT EXISTS crisis_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  severity TEXT NOT NULL CHECK (severity IN ('HIGH', 'CRITICAL')),
  triggers TEXT[],
  source TEXT NOT NULL, -- assessment, journal, voice_analysis
  notified_users UUID[],
  resolved BOOLEAN DEFAULT FALSE,
  resolved_by UUID REFERENCES users(id),
  resolution_notes TEXT,
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- ===========================
-- NOTIFICATIONS
-- ===========================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  type TEXT CHECK (type IN ('alert', 'info', 'success', 'crisis')),
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- AUDIT LOGS
-- ===========================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  metadata JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- DIGITAL TWIN (Module 13)
-- ===========================
CREATE TABLE IF NOT EXISTS digital_twin_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  predicted_readiness_7d NUMERIC(5,1),
  predicted_burnout_risk_7d NUMERIC(5,1),
  simulated_scenarios JSONB,
  forecast_data JSONB,
  confidence_score NUMERIC(4,3),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================
-- ROW LEVEL SECURITY
-- ===========================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mental_fitness_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE crisis_alerts ENABLE ROW LEVEL SECURITY;

-- Athletes can only see their own records
CREATE POLICY "Athletes see own data" ON mental_fitness_scores
  FOR SELECT USING (auth.uid() = athlete_id);

CREATE POLICY "Athletes manage own journals" ON journals
  FOR ALL USING (auth.uid() = athlete_id);

CREATE POLICY "Athletes submit own assessments" ON assessments
  FOR INSERT WITH CHECK (auth.uid() = athlete_id);

-- ===========================
-- DEMO SEED DATA
-- ===========================
INSERT INTO teams (id, name, sport, organization)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'India Blue XI', 'Cricket', 'BCCI Academy'),
  ('22222222-2222-2222-2222-222222222222', 'India Red XI', 'Cricket', 'BCCI Academy')
ON CONFLICT DO NOTHING;
