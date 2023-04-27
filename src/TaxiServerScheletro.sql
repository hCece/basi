GRANT EVENT ON *.* TO 'root'@'localhost';

DROP DATABASE IF EXISTS TAXISERVER;
SET SQL_SAFE_UPDATES = 0;
CREATE DATABASE IF NOT EXISTS TAXISERVER;
USE TAXISERVER; 

SET @T_COIN_CONVERSION = 3;
SET @PROFIT_PERCENTAGE = 0.2;



#Definisco le tabelle

CREATE TABLE CREDENZIALI(
    username varchar(20) primary key,
    psw varchar(20)
    
) ENGINE = "INNODB";

CREATE TABLE AMMINISTRATORE(
	Tel varchar(16),
    username varchar(20),
	nome varchar(20),
    cognome varchar(20),
    dataDiNascita date, #FORMAT	'0000-00-00'
    sede varchar(20),
    primary key(Tel),
    foreign key AMMINISTRATORE(username) references CREDENZIALI(username)
    
) ENGINE = "INNODB";

CREATE TABLE CLIENTE(
	Tel varchar(16),
    username varchar(20),
	nome varchar(20),
    cognome varchar(20),
    dataDiNascita date, #FORMAT	'0000-00-00'
	citta varchar(30),
    primary key(Tel),
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
    portafoglio int,
    euro int,
    tcoin int,
    data datetime,
    Ncarta varchar(16),
    foreign key RICARICA(portafoglio) references PORTAFOGLIO(CODP)
	
) ENGINE = "INNODB";

CREATE TABLE TASSISTA(
	Tel varchar(16),
    username varchar(20),
	nome varchar(20),
    cognome varchar(20),
    dataDiNascita date, #FORMAT	'0000-00-00'
    targaAuto varchar(7) unique not null,
    foto varchar(20), #CAMBIARE CON BLOB
	citta varchar(30),
    Ncorse int default 0,
    primary key(Tel),
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
    lusso boolean default false,
    elettrico boolean default false,
    foreign key TAXIPRO(targa) references TASSISTA(targaAuto)
	
) ENGINE = "INNODB";

CREATE TABLE PRENOTAZIONECORSA(
    usernameCliente varchar(20) primary key,
	pro boolean default false,
    partenza varchar(50), 
    arrivo varchar(50),
    posti int,
    data datetime,
    costo int,
    haCorsa boolean default false,
    foreign key PRENOTAZIONECORSA(usernameCliente) references CLIENTE(username)
) ENGINE = "INNODB";

CREATE TABLE CORSA(
	IDC int auto_increment primary key,
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
    psw varchar(20),
	fotoDoc varchar(20), #CAMBIARE CON BLOB
    marca varchar(20),
    modello varchar(20),
    posti int,
    targa varchar(7),
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
create procedure aggiungiCliente(in Tel varchar(16), username varchar(16), nome varchar(20), cognome varchar(20), dataDiNascita date, citta varchar(30))
begin
		insert into CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) values(Tel,username,nome,cognome,dataDiNascita,citta);
end //

delimiter //
create procedure checkTel(in TelUtente varchar(16), out result varchar(2))
begin
	if(not exists(select Tel from CLIENTE where Tel = TelUtente))then
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
create procedure ricaricaPortafoglio(in codicePortafoglio varchar(20), euro int, Ncarta varchar(16))
begin
			insert into RICARICA(portafoglio,euro,tcoin,data,Ncarta) values (codicePortafoglio, euro, (euro*@T_COIN_CONVERSION),now(), Ncarta);
			update PORTAFOGLIO set credito = (credito + (euro*3)) where CODP = codicePortafoglio; #update client's wallet amount 
		
end //


delimiter //
create procedure creditoSufficente(in usernameCliente varchar(20), euro int, out rtrn boolean)
begin
	SET rtrn = exists(select * from PORTAFOGLIO where username = usernameCliente and euro*3 < credito);
end// 


# se il cliente ha abbastanza denaro, allore gli euro vengono convertiti in Tcoin e il costo sottratto dal cliente
# e il 90% del costo viene aggiunto al tassista
delimiter //
create procedure pagaCorsa(in usernameCliente varchar(20), usernameTassista varchar(20), euro int)
begin
		declare haSoldi boolean default false;
		declare tCoin int;
		call creditoSufficente (usernameCliente, euro, haSoldi );
        if(haSoldi) then
            set tCoin = euro*3;
            update PORTAFOGLIO set credito = (credito - tCoin) where username = usernameCliente;
			update PORTAFOGLIO set credito = (credito + tCoin*(1-0.2)) where username = usernameTassista;
		end if;
end //


#restituisce il credito rimanente in portafoglio
delimiter // 
create procedure creditoPortafoglio(in usernameCliente varchar(20), out creditoResiduo int)
begin
    select credito into creditoResiduo from PORTAFOGLIO where username = usernameCliente;
    
end //

delimiter // 
create procedure codicePortafoglio(in usernameCliente varchar(20), out codicePort int)
begin
    select CODP into codicePort from PORTAFOGLIO where username = usernameCliente;
end //


delimiter // 
create procedure getTel(in username varchar(20), out rtrn varchar(16))
begin
	select tel into rtrn from cliente where cliente.username = username;
    if(rtrn is null) then
		select tel into rtrn from tassista where tassista.username = username;
    end if;
end //


delimiter //
create procedure inserisciPrenotazione(in pro int, partenza varchar(50), arrivo varchar(50), Nposti int, usernameCliente varchar(20), lus int, ele int, costo int, out rtrn int)
begin

	declare existsTaxi boolean default false;
	declare haSoldi boolean default false;
    if(pro) then 
	    set existsTaxi= exists(
			select *  #check if there are any PRO taxies in  the departure city with desired optionals
	        from TAXIPRO join TASSISTA on TASSISTA.targaAuto = TAXIPRO.targa
	        where ((citta = partenza) and (posti >= Nposti)  and (lusso= lus)  and (elettrico = ele)));
    else
		set existsTaxi= exists(
		select *  #check if there are any NORMAL taxies in  the departure city
        from TAXI join TASSISTA on TASSISTA.targaAuto = TAXI.targa
        where (citta = partenza and posti >= Nposti));
    end if;
    
    call creditoSufficente(usernameCliente, costo, haSoldi);
    
    
    
    if(existsTaxi) then #if there is at least 1 taxi matching the request add PRENOTAZIONECORSA
		if(haSoldi) then
			insert into PRENOTAZIONECORSA(pro, partenza, arrivo, posti, data, usernameCliente, costo) values(pro, partenza, arrivo, Nposti, now(), usernameCliente, costo);
			SET rtrn= 1;
		else
			SET rtrn= -400; # -400 means no moneyz
        end if;
	else
		SET rtrn= -200; # -200 means no existing taxi
    end if;
    
end //



delimiter //
CREATE PROCEDURE verificaStatoPrenotazione(IN username varchar(20), OUT rtrn varchar(20))
BEGIN
    DECLARE num_corse INT;
    SELECT COUNT(*) INTO num_corse FROM prenotazionecorsa WHERE usernameCliente = username;
    IF num_corse > 0 THEN
        SELECT COUNT(*) INTO num_corse FROM prenotazionecorsa WHERE usernameCliente = username AND haCorsa = 1;
		IF num_corse > 0 THEN
			SET rtrn = "si corsa";
		else
			SET rtrn = "si prenotazione";
		END IF;
	else
		SET rtrn = "no prenotazione";
    END IF;
	
END;
//



# La stored procedure che deve essere richiamata per inserire una corsa.
# Controlla se esiste una prenotazione per la corsa, e se quella prenotazione non è già stata assegnata ad un altro tassista
# Successivamente viene controllato se l'utente possiede sufficente denaro per pagare la corsa
# Se le condizioni sono tutte vere: viene creata una nuova corsa, modificata la variabile haCorsa nella tabella prenotazione e
# infine si richiama la stored proc. che effettua il pagamento 

delimiter //
create procedure inserisciCorsa(in partenza varchar(50), arrivo varchar(50), usernameCliente varchar(20), usernameTassista varchar(20),importo int, out rtrn varchar(20)) 
begin
	declare checkVal boolean default false;
	declare costoVar int;
    set checkVal= exists( select * from prenotazionecorsa as pc where pc.usernameCliente = usernameCliente and haCorsa = false);
    if(checkVal) then
		call creditoSufficente(usernameCliente, importo, checkVal);
		if(checkVal) then
			insert into CORSA(partenza, arrivo, data, usernameCliente, usernameTassista, importo) values(partenza, arrivo, now(), usernameCliente, usernameTassista, importo);
			
			UPDATE prenotazioneCorsa as pc
			SET haCorsa = true
			WHERE pc.usernameCliente = usernameCliente;
			
			set costoVar = (select costo from prenotazioneCorsa as pc where pc.usernameCliente = usernameCliente);
			call pagaCorsa(usernameCliente, usernameTassista, costoVar);
		end if;
	end if;
    set rtrn = checkVal;
end//


delimiter //
#when a tassista accepts the PRENOTAZIONECORSA a CORSA is created 
create procedure eliminaPrenotazione(username varchar(20)) 
begin
    DELETE FROM prenotazioneCorsa WHERE usernameCliente = username;
end// 	

delimiter //
create procedure inserisciRichiamo(in usernameAmministratore varchar(20), usernameTassista varchar(20), commento varchar(200))
begin	
    declare checkTaxi boolean default false;
    declare checkAmm boolean default false;
    
	set checkTaxi = exists(select usernameTassista from TASSISTA where usernameTassista = usernameTassista); 
	set checkAmm = exists(select usernameAmministratore from AMMINISTRATORE where  usernameAmministratore = usernameAmministratore);
    
    if(checkTaxi and checkAmm ) then #check if amministratore and tassista exists 
		insert into RICHIAMO(usernameAmministratore,usernameTassista,commento,data) values 
							(usernameAmministratore,usernameTassista,commento,now());
        
    end if;

end //

delimiter //
create procedure inserisciRecensione(in idc int, voto enum('1','2','4','5','6','7','8','9','10'),commento varchar(200))
begin
	insert into RECENSIONE(IDC,voto,commento) values(idc,voto,commento);
end //

delimiter //
create procedure inserisciRichiestaLavoro(in usernameCliente varchar(20), nuovoUsername varchar(20), psw varchar(100), fotoDoc varchar(20), marca varchar(20), 
											modello varchar(20), targa varchar(7), posti int, lusso int, elettrico int, out rtrn varchar(80) )
begin
	declare checkUsername boolean default false;
    declare checkRichiesta boolean default false;
    declare checkTel boolean default false;
    set checkRichiesta = NOT exists(select usernameCliente from RICHIESTALAVORO where usernameCliente = usernameCliente);
    set checkUsername = NOT exists(select username from credenziali where username = nuovoUsername);
    set checkTel = NOT exists(select * from tassista where Tel IN (select Tel from cliente where username = usernameCliente ));
    
     #check if the new username isen't already taken and check if there is not already a job request for this cliente
    if checkUsername then 
		if (checkRichiesta) then
			if (checkTel) then
				insert into RICHIESTALAVORO(usernameCliente, nuovoUsername, psw, fotoDoc, marca, modello, targa, posti, lusso, elettrico) 
				values(usernameCliente, nuovoUsername,psw, fotoDoc, marca, modello, targa, posti, lusso, elettrico);
				set rtrn='ok';
			else 
				set rtrn="sei attualmente un tassista";
			end if;
		else 
			set rtrn = "La tua richiesta sta per essere valutata. Aspetta una risposta";
		end if;
	else
        set rtrn='Username non disponibile';
	end if;
    
end //

delimiter //
create procedure inserisciBonifico(in codp int, tcoin int, IBAN varchar(27))
begin
	declare checkImporto int default 0;
    declare usernameT varchar(20);
    set checkImporto = (select credito from PORTAFOGLIO where PORTAFOGLIO.CODP = codp);
    set usernameT = (select username from PORTAFOGLIO where PORTAFOGLIO.CODP = codp);
    select checkImporto;
    select usernameT;
    
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

delimiter //
create procedure richiamiTassista(in usern varchar(20))
begin
select *
from RICHIAMO
where usernameTassista = usern;
end //


delimiter //
create procedure statoRichiesta(in username varchar(20), out rtrn varchar(15))
begin
	select stato into rtrn	
	from richiestaLavoro
	where usernameCliente = username;
    if(rtrn = "APPROVATO") then
		delete from richiestalavoro where usernameCliente = username;
    end if;
end //




delimiter //
create procedure storicoCorse(in usern varchar(20))
begin
	if(exists(select username from CLIENTE where username = usern))then
		select * 
        from CORSA 
        where (CORSA.usernameCliente = usern);
	else
		select * 
        from CORSA 
        where (CORSA.usernameTassista = usern);
	end if;

end //

delimiter //
CREATE PROCEDURE visualizzaRecensione (in idc int, out voto_commento VARCHAR(200))
BEGIN
    SELECT CONCAT(RECENSIONE.voto, ' - ', RECENSIONE.commento) INTO voto_commento FROM RECENSIONE WHERE RECENSIONE.IDC = idc;
    
END//

delimiter //
CREATE PROCEDURE topClienti()
BEGIN
    SELECT usernameCliente, COUNT(*) as cnt
    FROM CORSA
    GROUP BY usernameCliente
    ORDER BY cnt DESC
    LIMIT 10;
END //

delimiter //
CREATE PROCEDURE isTopCliente(in username VARCHAR(20), out rtrn int)
BEGIN
	call TopClienti();
	#check if the username given is one of the usernames in topclienti. If so set rtrn to 1 otherwise 0
END//

delimiter //
create procedure storicoRecensioni()
begin
	select *
	from RECENSIONE
	order by IDC desc;
end //





delimiter //
create procedure corseDisponibili(in usernameTassista varchar(20))
begin

	DECLARE profit DECIMAL(5,2) DEFAULT 0.2;
	SELECT partenza, arrivo, posti, data, usernameCliente,  ROUND(costo * (1 - profit))
	FROM prenotazioneCorsa
	WHERE partenza IN
		(SELECT citta FROM tassista 
		WHERE username = usernameTassista);
end //

delimiter //
create procedure countCorseDisponibili(in usernameTassista varchar(20), out count int)
begin
	set count = (SELECT count(*)
	FROM prenotazioneCorsa
	WHERE partenza IN
		(SELECT citta FROM tassista 
		WHERE username = usernameTassista));
end //



delimiter //
create procedure cancellaPrenotazione(in username varchar(20))
begin
	  DELETE FROM prenotazioneCorsa WHERE usernameCliente = username;
end //
##################	TRIGGERS	##########################

delimiter //
create trigger aggiungiTassista # DA SISTEMARE NON VANNO I SET, NON PASSA I DATI
after update on TAXISERVER.RICHIESTALAVORO
for each row 
begin

	declare TelTmp varchar(16) default '';
	declare nomeTmp varchar(20);
	declare cognomeTmp varchar(20);
	declare dataDiNascitaTmp date;
    declare cittaTmp varchar(20);

	if(new.stato='APPROVATO')then
		
        #QUA MI PRENDO I DATI CHE RIGUARDANO IL TASSISTA NON PRESENTI NELLA RICHIESTA
		select Tel into TelTmp from CLIENTE where CLIENTE.username = new.usernameCliente;
		set nomeTmp = (select nome from CLIENTE where CLIENTE.username = new.usernameCliente);
		set cognomeTmp = (select cognome from CLIENTE where CLIENTE.username = new.usernameCliente);
		set dataDiNascitaTmp = (select dataDiNascita from CLIENTE where CLIENTE.username = new.usernameCliente);
		set cittaTmp = (select citta from CLIENTE where username = new.usernameCliente);
        
        #INSERICO UN TASSISTA NUOVO, PROBLEMA I CAMPI SENZA NEW RIMANGONO VUOTI
        insert into CREDENZIALI(username, psw) values (new.nuovoUsername, new.psw);
		insert into TASSISTA(Tel,username,nome,cognome,dataDiNascita,targaAuto,foto,citta) values (TelTmp,new.nuovoUsername,nomeTmp,cognomeTmp,dataDiNascitaTmp,new.targa,new.fotoDoc,cittaTmp);
    end if;
	
end //

delimiter //
create trigger aggiungiTaxi
after update on TAXISERVER.RICHIESTALAVORO
for each row 
begin
	
	if(new.stato = 'APPROVATO')then
		if(new.lusso or new.elettrico) then #check if the taxi is pro and add it to the TAXIPRO table
			insert into TAXIPRO(targa,marca,modello,posti,lusso,elettrico)
            values (new.targa,new.marca,new.modello,new.posti,new.lusso,new.elettrico);
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

#####################   EVENTS     #########################
/*
delimiter $$
CREATE EVENT delete_reservations
	ON SCHEDULE EVERY 1 DAY
	DO
	  DELETE FROM prenotazioneCorsa
	  WHERE haCorsa = true;
	END 
$$ 
*/
####################   EXAMPLE CODE	########################
 

#in RICHIESTALAVORO ho inserito il campo 'stato' che aiuta un botto con la gestione delle funz

#caro juri nell'ultima parte ho inseito dati un po' ammerda per fare dei test
#potresti provare a inserire tutti i dati per bene seguendo le store procedures 
#senza fare INSERT violenti senza controlli. magari trovi degli errori 

#prova a correggere il trigger aggiungiTASSISTA e cerca di trovare un modo per eliminare i tassisti dopo che prendono 3 richiami 
#tra i trigger c'e' un prototipo NON funzionante del metodo che ho pensato




SET GLOBAL event_scheduler = ON;
INSERT INTO  CREDENZIALI(username,psw) VALUES ('yos99', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('dwdpie00', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('jury15', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('parme', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('andre', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('lucio', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('luca', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('claudia', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('enri', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('gio', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('paolo', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('marco', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('riccardo', '123');
INSERT INTO  CREDENZIALI(username,psw) VALUES ('alle', '123');

INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('001-123456','andre', 'andrea', 'serrano', '2000-02-05','Bologna');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('002-123456','lucio', 'lucio', 'dalla', '2000-02-05','Modena');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('003-123456','luca', 'luca', 'merighi', '2000-02-05','Roma');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('005-123456','claudia', 'claudia', 'bosi', '2000-02-05','Torino');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('006-123456','enri', 'enri', 'valentini x', '2000-02-05','Pavullo');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('007-123456','gio', 'gio', 'savoca', '2000-02-05','Ferrara');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('008-123456','marco', 'marco', 'mengoni', '2000-02-05','Sassuolo');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('009-123456','riccardo', 'riccardo', 'balestri', '2000-02-05','Fiorano');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('010-123456','alle', 'alle', 'ricci', '2000-02-05','Serramazzoni');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('011-123456','paolo', 'paolo', 'maccarini', '2000-02-05','Bologna');





INSERT INTO  AMMINISTRATORE(Tel,username,nome,cognome,dataDiNascita,sede) VALUES ('111-123456','yos99', 'youssef', 'zerowatt', '1999-12-05','Bologna');
INSERT INTO  CLIENTE(Tel,username,nome,cognome,dataDiNascita,citta) VALUES ('444-123456','dwdpie00', 'dawid', 'piesla', '2000-02-05','Bologna');
INSERT INTO  TASSISTA(Tel,username,nome,cognome,dataDiNascita,targaAuto,citta) VALUES ('222-123456','jury15', 'juri', 'horstmann', '2000-05-01','123qwe','Bologna');
INSERT INTO  TASSISTA(Tel,username,nome,cognome,dataDiNascita,targaAuto,citta) VALUES ('333-123456','parme', 'luca', 'parmesi', '2000-05-01','777cio','Bologna');


insert into TAXI(targa,marca,modello,posti) values('777cio','bmw','x25',9);
insert into TAXIPRO(targa,marca,modello,posti,elettrico,lusso) values ('123qwe','benz','slk',2,true,true);

INSERT INTO  CREDENZIALI(username,psw) VALUES ('ciccio22', '123');
call aggiungiCliente('012-123456', 'ciccio22', 'ciccio', 'gamer', '1990-02-25', 'Padova');

call inserisciBonifico(12, 60, "45ftg65tyh78ikjuyg56789iut");

call inserisciRichiamo('yos99','jury15','ha fatto il gay 1');
call inserisciRichiamo('yos99','jury15','ha fatto il gay 2');
#call inserisciRichiamo('yos99','jury15','ha fatto il gay 3');


call ricaricaPortafoglio(4, 100, '0945891423768901');
call ricaricaPortafoglio(2, 200, '2245891423228922'); #should not work tassista can't call ricaricaPortafoglio

call riconosciUtente('yos99','123', @nome);
select @nome;

#in pro int, partenza varchar(20), arrivo varchar(20), Nposti int, usernameCliente varchar(20), lus int, ele int, costo int, out rtrn int)

call inserisciPrenotazione(false, 'Bologna', 'Bologna', 1, 'dwdpie00', 0, 0, 1, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'dwdpie00', 'parme', 1,@rtrn);


call inserisciPrenotazione(true, 'Bologna', 'Bologna', 1, 'ciccio22', 1, 1, 10, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'ciccio22', 'jury15', 1,@rtrn);

call inserisciPrenotazione(false, 'Bologna', 'Bologna', 1, 'claudia', 0, 0, 1, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'claudia', 'parme', 1,@rtrn);

call inserisciPrenotazione(false, 'Bologna', 'Bologna', 1, 'alle', 0, 0, 1, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'alle', 'parme', 1,@rtrn);



call inserisciPrenotazione(false, 'Bologna', 'Bologna', 1, 'riccardo', 0, 0, 1, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'riccardo', 'parme', 1,@rtrn);

call inserisciPrenotazione(false, 'Bologna', 'Bologna', 1, 'enri', 0, 0, 1, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'enri', 'parme', 1,@rtrn);
DELETE FROM prenotazionecorsa;

call inserisciPrenotazione(false, 'Bologna', 'Bologna', 1, 'enri', 0, 0, 1, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'enri', 'parme', 1,@rtrn);
DELETE FROM prenotazionecorsa;


call inserisciPrenotazione(false, 'Bologna', 'Bologna', 1, 'paolo', 0, 0, 1, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'paolo', 'parme', 1,@rtrn);
DELETE FROM prenotazionecorsa;

call inserisciPrenotazione(false, 'Bologna', 'Bologna', 1, 'paolo', 0, 0, 1, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'paolo', 'parme', 1,@rtrn);
DELETE FROM prenotazionecorsa;

call inserisciPrenotazione(false, 'Bologna', 'Bologna', 1, 'paolo', 0, 0, 1, @rtrn);
call inserisciCorsa('Bologna', 'Bologna', 'paolo', 'parme', 1,@rtrn);
DELETE FROM prenotazionecorsa;

select * from corsa;

call inserisciRecensione(1,'5','molto bello lo rifarei');
call inserisciRecensione(2,'10','jury top g');
call inserisciRecensione(3,'1','pessima esperinza');
call inserisciRecensione(4,'2','macchina sporca');
call inserisciRecensione(5,'6','guida troppo veloce');
call inserisciRecensione(6,'4','puzza in auto');
call inserisciRecensione(7,'10','ottimo');
call inserisciRecensione(8,'10','ottimo');
call inserisciRecensione(9,'10','ottimo');


call visualizzaRecensione( 1 ,@voto);

select @voto;

call inserisciRichiestaLavoro("dwdpie00", "bomber", '123', 'foto',"audi", "a15", "173h132", 5, 0, 1, @rtrn);
call inserisciRichiestaLavoro("dwdpie00", "bomber", '123', 'foto',"audi", "a15", "173h132", 5, 0, 0, @rtrn);# should not work, same username

#call approvaRichiesta(1);
call creditoPortafoglio('parme',@res);
call codicePortafoglio('jury15',@res);
select @res;
select credito from PORTAFOGLIO where username = 'parme';
call topClienti();

call storicoCorse('ciccio22');
call storicoCorse('jury15');

call richiamiTassista('jury15');


call inserisciRichiestaLavoro("dwdpie00", "bomber", '123', 'foto',"audi", "a15", "173h132", 5, 0, 1, @rtrn);

call storicoRecensioni();

