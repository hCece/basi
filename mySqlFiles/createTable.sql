DROP DATABASE IF EXISTS TAXISERVER;

CREATE DATABASE IF NOT EXISTS TAXISERVER;
USE TAXISERVER; 

#Definisco le tabelle

CREATE TABLE CREDENZIALI(
    username varchar(20) primary key,
    psw varchar(20)
    
) ENGINE = "INNODB";

CREATE TABLE AMMINISTRATORE(
	CF varchar(16),
    username varchar(20),
	nome varchar(20),
    cognome varchar(20),
    dataDiNascita date, #FORMAT	'0000-00-00'
    sede varchar(20),
    primary key(CF),
    foreign key AMMINISTRATORE(username) references CREDENZIALI(username)
    
) ENGINE = "INNODB";

CREATE TABLE CLIENTE(
	CF varchar(16),
    username varchar(20),
	nome varchar(20),
    cognome varchar(20),
    dataDiNascita date, #FORMAT	'0000-00-00'
	citta varchar(30),
    primary key(CF),
    foreign key CLIENTE(username) references CREDENZIALI(username)
    
) ENGINE = "INNODB";

CREATE TABLE GRADUATORIACLIENTI(
    username varchar(20) primary key,
    punteggio int,
    foreign key GRADUATORIACLIENTI(username) references CLIENTE(username)
	
) ENGINE = "INNODB";

CREATE TABLE PORTAFOGLIO(
	CODP int auto_increment primary key,
    username varchar(20),
    credito int default 100,
    foreign key PORTAFOGLIO(username) references CREDENZIALI(username)
	
) ENGINE = "INNODB";

CREATE TABLE RICARICA(
	CODR int auto_increment primary key,
    usernameCliente varchar(20),
    euro int,
    tcoin int,
    data datetime,
    Ncarta varchar(16),
    foreign key RICARICA(usernameCliente) references CLIENTE(username)
	
) ENGINE = "INNODB";

CREATE TABLE TASSISTA(
	CF varchar(16),
    username varchar(20),
	nome varchar(20),
    cognome varchar(20),
    dataDiNascita date, #FORMAT	'0000-00-00'
    targaAuto varchar(7) unique not null,
    foto varchar(20), #CAMBIARE CON BLOB
	citta varchar(30),
    Ncorse int default 0,
    primary key(CF),
    foreign key TASSISTA(username) references CREDENZIALI(username) on delete cascade
    
) ENGINE = "INNODB";

CREATE TABLE BONIFICO(
	CODB int auto_increment primary key,
    usernameTassista varchar(20),
    euro int,
    tcoin int,
    data datetime,
    IBAN varchar(27),
    foreign key BONIFICO(usernameTassista) references TASSISTA(username)
	
) ENGINE = "INNODB";

CREATE TABLE TAXI(
	targa varchar(7) primary key,
    marca varchar(20),
    modello varchar(20),
    posti int,
	foreign key TAXI(targa) references TASSISTA(targaAuto)
    
) ENGINE = "INNODB";

CREATE TABLE TAXIPRO(
	targa varchar(7) primary key,
    marca varchar(20),
    modello varchar(20),
    posti int,
    blindato boolean default false,
	sportivo boolean default false,
    lusso boolean default false,
    elettrico boolean default false,
    foreign key TAXIPRO(targa) references TASSISTA(targaAuto)
	
) ENGINE = "INNODB";

CREATE TABLE PRENOTAZIONECORSA(
	IDP int auto_increment primary key,
	pro boolean default false,
    partenza varchar(50), 
    arrivo varchar(50),
    posti int,
    data datetime,
    usernameCliente varchar(20),
    foreign key PRENOTAZIONECORSA(usernameCliente) references CLIENTE(username)
    
) ENGINE = "INNODB";

CREATE TABLE CORSA(
	IDC int auto_increment primary key,
	pro boolean default false,
    partenza varchar(50), 
    arrivo varchar(50),
    data datetime,
    usernameCliente varchar(20),
    usernameTassista varchar(20),
    importo int,
    foreign key (usernameCliente) references CLIENTE(username),
	foreign key (usernameTassista) references TASSISTA(username)
    
) ENGINE = "INNODB";

CREATE TABLE RECENSIONE(
	
    IDC int primary key,
    voto enum('1','2','4','5','6','7','8','9','10') default '10',
    commento varchar(200),
    foreign key (IDC) references CORSA(IDC)
	
) ENGINE = "INNODB";

CREATE TABLE RICHIESTALAVORO(
	IDRICHIESTA int auto_increment primary key,
	usernameCliente varchar(20),
    nuovoUsername varchar(20),
	fotoDoc varchar(20), #CAMBIARE CON BLOB
    marca varchar(20),
    modello varchar(20),
    posti int,
    targa varchar(7),
	blindato boolean default false,
	sportivo boolean default false,
    lusso boolean default false,
    elettrico boolean default false,
    stato enum('APERTO','APPROVATO','NEGATO') default 'APERTO',
    foreign key RICHIESTALAVORO(usernameCliente) references CLIENTE(username)
	
) ENGINE = "INNODB";

CREATE TABLE RICHIAMO(
	IDRICHIAMO int auto_increment primary key,
	usernameAmministratore varchar(20),
	usernameTassista varchar(20),
    commento varchar(200),
    data datetime,
    foreign key (usernameAmministratore) references AMMINISTRATORE(username),
	foreign key (usernameTassista) references TASSISTA(username) on delete cascade
	
) ENGINE = "INNODB";

################	PROCEDURES	######################

delimiter //
create procedure aggiungiCredenziali(in usern varchar(20), passw varchar(20))
begin
		insert into CREDENZIALI(username,psw) values(usern,passw);
end //

delimiter //
create procedure checkUsername(in usern varchar(20), out result varchar(2))
begin
    if(not exists(select username from CREDENZIALI where username = usern))then
		set result = "OK";
	end if;
end //

delimiter //
create procedure aggiungiCliente(in CF varchar(16), username varchar(16), nome varchar(20), cognome varchar(20), dataDiNascita date, citta varchar(30))
begin
		insert into CLIENTE(CF,username,nome,cognome,dataDiNascita,citta) values(CF,username,nome,cognome,dataDiNascita,citta);
end //

delimiter //
create procedure checkCF(in cfUtente varchar(16), out result varchar(2))
begin
	if(not exists(select CF from CLIENTE where CF = cfUtente))then
		set result = "OK";
	end if;
end //

delimiter //
create procedure riconosciUtente(in usernameUtente varchar(20), pswUtente varchar(20), out tipo varchar(15)) #takes in input username and gives in output the type of the user
begin

	if(exists(select * from CREDENZIALI where username = usernameUtente and psw=pswUtente))then
    
		if(exists(select username from CLIENTE where CLIENTE.username = usernameUtente))then
			set tipo='cliente';
		elseif(exists(select username from TASSISTA where TASSISTA.username = usernameUtente))then
			set tipo='tassista';
		elseif(exists(select username from AMMINISTRATORE where AMMINISTRATORE.username = usernameUtente))then
			set tipo='amministratore';
		end if;
	else
		set tipo = 'unregistered';
        
    end if;

    
end//

delimiter //
create procedure ricaricaPortafoglio(in usernameU varchar(20), euro int, Ncarta varchar(16))
begin
		declare checkUsr boolean default false;
        set checkUsr = exists(select username from CLIENTE where username = usernameU);
        
        if(checkUsr) then #check if user is in CLIENTE
			insert into RICARICA(usernameCliente,euro,tcoin,data,Ncarta) values (usernameU, euro, (euro*3),now(), Ncarta);
			update PORTAFOGLIO set credito = (credito + (euro*3)) where username = usernameU; #update client's wallet value 
		end if;
end //

delimiter //
create procedure inserisciPrenotazione(in pro int, partenza varchar(20), arrivo varchar(20), Nposti int, usernameCliente varchar(20), lus int, ele int)
begin

	declare checkVal boolean default false;
    
    if(pro) then 
    set checkVal= exists(
		select *  #check if there are any PRO taxies in  the departure city with desired optionals
        from TAXIPRO join TASSISTA on TASSISTA.targaAuto = TAXIPRO.targa
        where ((citta = partenza) and (posti >= Nposti) and  (lusso= lus) and (elettrico = ele)));
    else
		set checkVal= exists(
		select *  #check if there are any NORMAL taxies in  the departure city
        from TAXI join TASSISTA on TASSISTA.targaAuto = TAXI.targa
        where (citta = partenza and posti >= Nposti));
    end if;
    
    
    if(checkVal) then #if there is at least 1 taxi matching the request add PRENOTAZIONECORSA
		insert into PRENOTAZIONECORSA(pro, partenza, arrivo, posti, data, usernameCliente) values(pro, partenza, arrivo, Nposti, now(), usernameCliente);
	end if;
end //

delimiter //
#when a tassista accepts the PRENOTAZIONECORSA a CORSA is created 
create procedure inserisciCorsa(in pro boolean, partenza varchar(20), arrivo varchar(20), usernameCliente varchar(20), usernameTassista varchar(20), importo int) 
begin
	insert into CORSA(pro, partenza, arrivo, data, usernameCliente, usernameTassista, importo) values(pro, partenza, arrivo, now(), usernameCliente, usernameTassista, importo);
end//

delimiter //
create procedure inserisciRichiamo(in usernameAmministratore varchar(20), usernameTassista varchar(20), commento varchar(200))
begin	
    declare checkTaxi boolean default false;
    declare checkAmm boolean default false;
    
	set checkTaxi = exists(select usernameTassista from TASSISTA where usernameTassista = usernameTassista); 
	set checkAmm = exists(select usernameAmministratore from AMMINISTRATORE where  usernameAmministratore = usernameAmministratore);
    
    if(checkTaxi and checkAmm ) then #check if amministratore and tassista exists 
		insert into RICHIAMO(usernameAmministratore,usernameTassista,commento,data) values (usernameAmministratore,usernameTassista,commento,now());
        
    end if;

end //

delimiter //
create procedure inserisciRecensione(in idc int, voto enum('1','2','4','5','6','7','8','9','10'),commento varchar(200))
begin
	insert into RECENSIONE(IDC,voto,commento) values(idc,voto,commento);
end //

delimiter //
create procedure inserisciRichiestLavoro(in usernameCliente varchar(20), nuovoUsername varchar(20), password varchar(100), fotoDoc varchar(20), marca varchar(20), 
modello varchar(20), targa varchar(7), posti int, blindato boolean, lusso boolean, sportivo boolean, elettrico boolean)
begin
	declare checkUsername boolean default false;
    declare checkRichiesta boolean default false;
    set checkRichiesta = NOT exists(select usernameCliente from RICHIESTALAVORO where usernameCliente = usernameCliente);
    set checkUsername = NOT exists(select username from TASSISTA where username = nuovoUsername);
    
    if(checkUsername AND checkRichiesta) then #check if the new username isen't already taken and check if there is not already a job request for this cliente
		insert into RICHIESTALAVORO(usernameCliente, nuovoUsername, fotoDoc, marca, modello, targa, posti, blindato, sportivo, lusso, elettrico) 
        values(usernameCliente, nuovoUsername, fotoDoc, marca, modello, targa, posti, blindato, sportivo, lusso, elettrico);
	end if;
end //

delimiter //
create procedure inserisciBonifico(in usernameT varchar(20), tcoin int, data datetime, IBAN varchar(27))
begin
	declare checkImporto int default 0;
    set checkImporto = (select credito from PORTAFOGLIO where username = usernameT);
    
    if((checkImporto - tcoin) >= 0) then #check if the tassista isn't requesting a bonifico bigger than his credito
	 insert into BONIFICO(usernameTassista, tcoin, euro, data, IBAN) values(usernameT, tcoin, (tcoin/3), now(), IBAN);
     update PORTAFOGLIO set credito = (credito - tcoin) where username = usernameT; #uptate tassista's portafoglio after bonifico
    end if;
end //

delimiter //
create procedure approvaRichiesta(in idr int)
begin
	update RICHIESTALAVORO set stato = 'APPROVATO' where IDR = idr;
end//

delimiter //
create procedure rifiutaRichiesta(in idr int)
begin
	update RICHIESTALAVORO set stato = 'RIFIUTATO' where IDR = idr;
end//
##################	TRIGGERS	##########################

delimiter //
create trigger aggiungiTassista # DA SISTEMARE NON VANNO I SET, NON PASSA I DATI
after update on TAXISERVER.RICHIESTALAVORO
for each row 
begin

	declare cf varchar(16) default '';
	declare nome varchar(20);
	declare cognome varchar(20);
	declare dataDiNascita date;
    declare citta varchar(20);
   set cf = (select CF from CLIENTE where CLIENTE.username = new.usernameCliente);

	if(new.stato='APPROVATO')then
		
        #QUA MI PRENDO I DATI CHE RIGUARDANO IL TASSISTA NON PRESENTI NELLA RICHIESTA
		set nome = (select nome from CLIENTE where username = new.usernameCliente);
		set cognome = (select cognome from CLIENTE where username = new.usernameCliente);
		set dataDiNascita = (select dataDiNascita from CLIENTE where username = new.usernameCliente);
		set citta = (select citta from CLIENTE where username = new.usernameCliente);
        
        #INSERICO UN TASSISTA NUOVO, PROBLEMA I CAMPI SENZA NEW RIMANGONO VUOTI
		insert into TASSISTA(CF,username,nome,cognome,dataDiNascita,targaAuto,foto,citta) values (cf,username,nome,cognome,dataDiNascita,new.targa,new.fotoDoc,citta);
    end if;
	
end //

delimiter //
create trigger aggiungiTaxi
after update on TAXISERVER.RICHIESTALAVORO
for each row 
begin
	
	if(new.stato = 'APPROVATO')then
		if(new.blindato or new.sportivo or new.lusso or new.elettrico) then #check if the taxi is pro and add it to the TAXIPRO table
			insert into TAXIPRO(targa,marca,modello,posti,blindato,sportivo,lusso,elettrico)
            values (new.targa,new.marca,new.modello,new.posti,new.blindato,new.sportivo,new.lusso,new.elettrico);
		else
			insert into TAXI(targa,marca,modello,posti) #taxi isn't pro add it to the TAXI table
            values (new.targa,new.marca,new.modello,new.posti);
		end if;
    end if;
end //

delimiter //
create trigger aggiungiPortafoglioCliente #whenever a new cliente is added links him a wallet 
after insert on TAXISERVER.CLIENTE 
for each row 
begin
		insert into PORTAFOGLIO(username) values(new.username);
end//

delimiter //
create trigger aggiungiPortafoglioTassista #whenever a new tassista is added links him a wallet 
after insert on TAXISERVER.TASSISTA 
for each row
begin
		insert into PORTAFOGLIO(username) values(new.username);
end//


#delimiter //
#create trigger licenziaTassista
#after insert ON TAXISERVER.RICHIAMO 
#FOR EACH ROW 
#BEGIN
#	declare nRichiamo int default 0;
#    
#	set nRichiamo = (select count(usernameTassista) from RICHIAMO where usernameTassista = new.usernameTassista);

#if (nRichiamo > 2) then
#	delete from RICHIAMO where usernameTassista = new.usernameTassista;
#end if;
#END//


#delimiter //
#CREATE EVENT eliminaTassisti 
#on schedule AT CURRENT_TIMESTAMP + INTERVAL 1 second
#ON COMPLETION PRESERVE
#DO
#DELETE FROM RICHIAMO WHERE (usernameTassista = (select usernameTassista 
#											   from RICHIAMO 
#                                               group by usernameTassita
#											   having count(usernameTassista) > 2));
#end //
####################	VIEWS	########################

#create view creditoPortafoglio(username, credito) 
#as select(username, credito)
#from PORTAFOGLIO;
#where username ='' ;

#create view storicoCorse(IDC, partenza, arrivo, data, importo)
#as select(IDC, partenza, arrivo, data, importo)
#from CORSA;
#where username='';

#create view recensioniTassista();

#create view richiamiTassista(IDRICHIAMO, usernameAmministratore, commento, data)
#as select(IDRICHIAMO, usernameAmministratore, commento, data)
#from RICHIAMO;
##where usernameTassista = '';

#create view allCommenti(IDC,voto,commento)
#as select(IDC, voto, commento)
#from RECENSIONE;
##where '';


delimiter ;
SET GLOBAL event_scheduler = ON;

INSERT INTO  CREDENZIALI(username,psw) VALUES ('yos99', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('dwdpie00', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('jury15', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('parme', '123');


INSERT INTO  AMMINISTRATORE(CF,username,nome,cognome,dataDiNascita,sede) VALUES ('123a','yos99', 'youssef', 'zerowatt', '1999-12-05','Bologna');
INSERT INTO  CLIENTE(CF,username,nome,cognome,dataDiNascita,citta) VALUES ('123b','dwdpie00', 'dawid', 'piesla', '2000-02-05','Bologna');
INSERT INTO  TASSISTA(CF,username,nome,cognome,dataDiNascita,targaAuto,citta) VALUES ('123c','jury15', 'juri', 'horstmann', '2000-05-01','123qwe','Milano');
INSERT INTO  TASSISTA(CF,username,nome,cognome,dataDiNascita,targaAuto,citta) VALUES ('123d','parme', 'luca', 'parmesi', '2000-05-01','777cio','Bologna');

insert into TAXI(targa,marca,modello,posti) values('777cio','bmw','x25',9);
insert into TAXIPRO(targa,marca,modello,posti,blindato,sportivo) values ('123qwe','benz','slk',2,true,true);

INSERT INTO  CREDENZIALI(username,psw) VALUES ('ciccio22', '123');
call aggiungiCliente('123e', 'ciccio22', 'ciccio', 'gamer', '1990-02-25', 'Padova');

call inserisciBonifico("jury15", 60, now(), "45ftg65tyh78ikjuyg56789iut");
call inserisciRichiamo('yos99','jury15','ha fatto il gay 1');
call inserisciRichiamo('yos99','jury15','ha fatto il gay 2');
call inserisciRichiamo('yos99','jury15','ha fatto il gay 3');


call ricaricaPortafoglio('ciccio22', 100, '0945891423768901');
call ricaricaPortafoglio('jury15', 200, '2245891423228922'); #should not work tassista can't call ricaricaPortafoglio


call riconosciUtente('ciccio22','123e', @nome);
select @nome;
select * from cliente;
/*


call inserisciPrenotazione(false, 'Bologna', 'modena', 1, 'ciccio22', false, false, false, false);
call inserisciPrenotazione(true, 'Bologna', 'modena', 1, 'dwdpie00', true, true, false, false);


call inserisciCorsa(false, 'bolo', 'modena', 'ciccio22', 'jury15', 10);

call inserisciRecensione(1,'5','molto bello lo rifarei');

call inserisciRichiestLavoro("dwdpie00", "bomber", '123', 'foto',"audi", "a15", "173h132", 5, false, true, false, true);
call inserisciRichiestLavoro("dwdpie00", "bomber", '123', 'foto',"audi", "a15", "173h132", 5, false, false, false, false);# should not work, same username



#in RICHIESTALAVORO ho inserito il campo 'stato' che aiuta un botto con la gestione delle funz

#caro juri nell'ultima parte ho inseito dati un po' ammerda per fare dei test
#potresti provare a inserire tutti i dati per bene seguendo le store procedures 
#senza fare INSERT violenti senza controlli. magari trovi degli errori 

#prova a correggere il trigger aggiungiTASSISTA e cerca di trovare un modo per eliminare i tassisti dopo che prendono 3 richiami 
#tra i trigger c'e' un prototipo NON funzionante del metodo che ho pensato






