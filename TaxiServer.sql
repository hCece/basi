DROP DATABASE IF EXISTS TAXISERVER;

CREATE DATABASE IF NOT EXISTS TAXISERVER;
USE TAXISERVER; 

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
    primary key(CF,username),
    foreign key AMMINISTRATORE(username) references CREDENZIALI(username)
) ENGINE = "INNODB";

CREATE TABLE CLIENTE(
	CF varchar(16),
    username varchar(20),
	nome varchar(20),
    cognome varchar(20),
    dataDiNascita date, #FORMAT	'0000-00-00'
	città varchar(30),
    primary key(CF,username),
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
    credito int,
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
    targaAuto varchar(7) unique,
    foto blob,
	città varchar(30),
    Ncorse int default 0,
    primary key(CF,username),
    foreign key TASSISTA(username) references CREDENZIALI(username)
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
    targa varchar(7),
    usernameCliente varchar(20),
    usernameTassista varchar(20),
    foreign key (usernameCliente) references CLIENTE(username),
	foreign key (usernameTassista) references TASSISTA(username),
	foreign key (targa) references TASSISTA(targaAuto)
	
) ENGINE = "INNODB";

CREATE TABLE RECENSIONE(
	IDR int auto_increment primary key,
    voto enum('1','2','4','5','6','7','8','9','10') default '10',
    commento varchar(200)
	
) ENGINE = "INNODB";

CREATE TABLE RICHIESTALAVORO(
	IDRICHIESTA int auto_increment primary key,
	usernameCliente varchar(20),
	foroDoc blob,
    marca varchar(20),
    modello varchar(20),
    posti int,
    targa varchar(7),
	blindato boolean default false,
	sportivo boolean default false,
    lusso boolean default false,
    elettrico boolean default false,
    foreign key RICHIESTALAVORO(usernameCliente) references CLIENTE(username)
	
) ENGINE = "INNODB";

CREATE TABLE RICHIAMO(
	IDRICHIAMO int auto_increment primary key,
	usernameAmministratore varchar(20),
	usernameTassista varchar(20),
    foreign key (usernameAmministratore) references AMMINISTRATORE(username),
	foreign key (usernameTassista) references TASSISTA(username)
	
) ENGINE = "INNODB";


