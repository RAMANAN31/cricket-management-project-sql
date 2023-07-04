# cricket-management-project-sql
ABOUT:
cricket team SQL project is a comprehensive database system designed to manage and organize information about our team, including players, matches, and statistics. We have recently added a new entity to our database: The Sponsor. Sponsors are individuals or organizations that provide financial support to our team. Each sponsor has a unique ID, name, office address, and type. This new addition allows us to keep track of our sponsors and their contributions to our team. With this information at our fingertips, we can better manage our finances and build stronger relationships with our supporters.



![image](https://github.com/RAMANAN31/cricket-team-management-project-sql/assets/112418260/5ba88006-3a8e-4b40-9feb-6fe514e53bd0)

Types of Sponsors

In cricket, there are several types of sponsors that support teams and events. Some common types of sponsors include:


Title Sponsor: This is the main sponsor of a team or event and usually has their name included in the official title. For example, TATA is the title sponsor of IPL 2022.


Official Partners: These are companies that have an official partnership with a team or event and provide financial support in exchange for branding and advertising opportunities. For example, Dream11, Unacademy, CRED, Upstox, RuPay and Swiggy Instamart are official partners of IPL 2022.


Broadcasters: These are media companies that have the rights to broadcast matches and events. For example, Star Sports is the official broadcaster of IPL 2022.


Kit Sponsor: This is a company that provides the team's uniforms and has their logo displayed on them. For example, Adidas is the kit sponsor for the Indian national men’s cricket team.


Umpire Sponsor: This is a company that sponsors the umpires of a league or tournament. For example, PayTM is the umpire sponsor of IPL 2022.



ER-DIAGRAM:

in progress....

ENTITIES:

player:

team:(t_name,t_ID,staff_name,staff_Id,contract_period,off_addr,contact

Conducting_Board:(name,b_ID,type,revenue,expense,profit,format,s_ID referencing Sponsor(s_ID))

Sponsor:(name,s_ID,type,office address

Schedule:(weak entitity)(name,format_s foreign key referencing Conducting_board(format),shl_ID,shl_desc)

Equiptment:(weak entitity)


RELATIONSHIPS:



CREATE DATABASE: Creates a database for the given database schema


*create table:(team,player,conducting board,schedule,equiptment,sponsor)


*insert values into table:(team,player,conducting board,schedule,equiptment,sponsor)


*perform essential database operations using table:(team,player,conducting board,schedule,equiptment,sponsor)


