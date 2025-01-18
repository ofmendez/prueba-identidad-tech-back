DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Devices;

CREATE TABLE IF NOT EXISTS Users ( 
	UserId TEXT PRIMARY KEY, 
	Name TEXT,
	Pass TEXT,
	Salt TEXT,
	Role TEXT,
	State TEXT
);

CREATE TABLE IF NOT EXISTS Devices ( 
	DeviceId INTEGER PRIMARY KEY AUTOINCREMENT,
	Name TEXT,
	State TEXT,
  Battery TEXT,
  Storage TEXT,
  Price TEXT,
  MainCamera TEXT,
  FrontCamera TEXT,
	createdAt TIMESTAMP,
	updatedAt TIMESTAMP
);

INSERT INTO Users (UserId, Name, Pass, Salt, Role, State)
VALUES 
(
	'0a567ef0-47a1-4ac3-8f65-694122de35c0',
	'The Administrator',
	'0e6d9c588b0a4886b5b8006b8d548c01b21ec99f2041087e1323993dc2a0cbe0ba550fabd98f75fe58cc927840133fab78930eab9d1e278214d92f24f6544bfc',
	'7bf4050c78329873adc86ab624cfceb3',
	'Admin',
	'Active'
);

