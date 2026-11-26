-- ============================================
-- SCRIPT 1: CREAR BASE DE DATOS GestionCompras
-- ============================================
-- Este script crea la base de datos con:
-- - 5 tablas base (Proveedores, Usuarios, Facturas, Ordenes, Remitos)
-- - 5 tablas del Grupo 5 (Notas Crédito/Débito, Informes Cotejo + M:N)
-- - Datos de prueba
-- ============================================

USE master;
GO

-- Borrar la base si existe
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'GestionCompras')
BEGIN
    ALTER DATABASE GestionCompras SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE GestionCompras;
END
GO

CREATE DATABASE GestionCompras;
GO

USE GestionCompras;
GO

-- ============================================
-- TABLAS BASE (simulan existir en el sistema completo)
-- ============================================

-- Tabla: Proveedores
CREATE TABLE Proveedores (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Razon_Social NVARCHAR(100) NOT NULL,
    CUIT NVARCHAR(20) UNIQUE NOT NULL,
    Email NVARCHAR(100),
    Activo BIT DEFAULT 1
);
GO

-- Tabla: Usuarios
CREATE TABLE Usuarios (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(50) NOT NULL,
    Apellido NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Activo BIT DEFAULT 1
);
GO

-- Tabla: Facturas_Compra
CREATE TABLE Facturas_Compra (
    ID INT PRIMARY KEY IDENTITY(1,1),
    FK_Proveedor INT NOT NULL,
    FK_Usuario INT NOT NULL,
    Numero_Factura NVARCHAR(50) NOT NULL,
    Monto_Total DECIMAL(18,2) NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (FK_Proveedor) REFERENCES Proveedores(ID),
    FOREIGN KEY (FK_Usuario) REFERENCES Usuarios(ID)
);
GO

-- Tabla: Ordenes_Compra
CREATE TABLE Ordenes_Compra (
    ID INT PRIMARY KEY IDENTITY(1,1),
    FK_Proveedor INT NOT NULL,
    FK_Usuario INT NOT NULL,
    Numero_Orden NVARCHAR(50) NOT NULL,
    Fecha_Emision DATETIME DEFAULT GETDATE(),
    Estado NVARCHAR(20) DEFAULT 'Pendiente',
    FOREIGN KEY (FK_Proveedor) REFERENCES Proveedores(ID),
    FOREIGN KEY (FK_Usuario) REFERENCES Usuarios(ID)
);
GO

-- Tabla: Remitos_Ingreso
CREATE TABLE Remitos_Ingreso (
    ID INT PRIMARY KEY IDENTITY(1,1),
    FK_Orden_Compra INT NOT NULL,
    FK_Usuario INT NOT NULL,
    Numero_Remito NVARCHAR(50) NOT NULL,
    Fecha_Ingreso DATETIME DEFAULT GETDATE(),
    Es_Devolucion BIT DEFAULT 0,
    Motivo_Devolucion NVARCHAR(255) NULL,
    FOREIGN KEY (FK_Orden_Compra) REFERENCES Ordenes_Compra(ID),
    FOREIGN KEY (FK_Usuario) REFERENCES Usuarios(ID)
);
GO

-- ============================================
-- TABLAS DEL GRUPO 5
-- ============================================

-- Tabla: Notas_Credito_Compra
CREATE TABLE Notas_Credito_Compra (
    ID INT PRIMARY KEY IDENTITY(1,1),
    FK_Factura_Compra INT NOT NULL,
    FK_Proveedor INT NOT NULL,
    Monto DECIMAL(18,2) NOT NULL,
    Motivo NVARCHAR(255) NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (FK_Factura_Compra) REFERENCES Facturas_Compra(ID),
    FOREIGN KEY (FK_Proveedor) REFERENCES Proveedores(ID)
);
GO

-- Tabla: Notas_Debito_Compra
CREATE TABLE Notas_Debito_Compra (
    ID INT PRIMARY KEY IDENTITY(1,1),
    FK_Factura_Compra INT NOT NULL,
    FK_Proveedor INT NOT NULL,
    Monto DECIMAL(18,2) NOT NULL,
    Motivo NVARCHAR(255) NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (FK_Factura_Compra) REFERENCES Facturas_Compra(ID),
    FOREIGN KEY (FK_Proveedor) REFERENCES Proveedores(ID)
);
GO

-- Tabla: Informes_Cotejo_Compra
CREATE TABLE Informes_Cotejo_Compra (
    ID INT PRIMARY KEY IDENTITY(1,1),
    FK_Factura_Compra INT NOT NULL,
    FK_Usuario INT NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    Estado NVARCHAR(20) NOT NULL CHECK (Estado IN ('Aprobado', 'Rechazado')),
    Motivo_Rechazo NVARCHAR(255) NULL,
    FOREIGN KEY (FK_Factura_Compra) REFERENCES Facturas_Compra(ID),
    FOREIGN KEY (FK_Usuario) REFERENCES Usuarios(ID)
);
GO

-- Tabla: Informes_Cotejo_Remitos (Relación M:N)
CREATE TABLE Informes_Cotejo_Remitos (
    FK_Informe_Cotejo INT NOT NULL,
    FK_Remito_Ingreso INT NOT NULL,
    PRIMARY KEY (FK_Informe_Cotejo, FK_Remito_Ingreso),
    FOREIGN KEY (FK_Informe_Cotejo) REFERENCES Informes_Cotejo_Compra(ID),
    FOREIGN KEY (FK_Remito_Ingreso) REFERENCES Remitos_Ingreso(ID)
);
GO

-- Tabla: Informes_Cotejo_Ordenes (Relación M:N)
CREATE TABLE Informes_Cotejo_Ordenes (
    FK_Informe_Cotejo INT NOT NULL,
    FK_Orden_Compra INT NOT NULL,
    PRIMARY KEY (FK_Informe_Cotejo, FK_Orden_Compra),
    FOREIGN KEY (FK_Informe_Cotejo) REFERENCES Informes_Cotejo_Compra(ID),
    FOREIGN KEY (FK_Orden_Compra) REFERENCES Ordenes_Compra(ID)
);
GO

-- ============================================
-- DATOS DE PRUEBA
-- ============================================

-- Proveedores
INSERT INTO Proveedores (Razon_Social, CUIT, Email) VALUES
('Distribuidora El Sol S.A.', '30-12345678-9', 'ventas@elsol.com'),
('Importadora La Estrella', '30-87654321-0', 'info@laestrella.com'),
('Mayorista Central', '30-11223344-5', 'contacto@mayoristacentral.com');
GO

-- Usuarios
INSERT INTO Usuarios (Nombre, Apellido, Email) VALUES
('Juan', 'Perez', 'juan.perez@empresa.com'),
('Maria', 'Gomez', 'maria.gomez@empresa.com'),
('Carlos', 'Lopez', 'carlos.lopez@empresa.com');
GO

-- Facturas de Compra
INSERT INTO Facturas_Compra (FK_Proveedor, FK_Usuario, Numero_Factura, Monto_Total) VALUES
(1, 1, 'FAC-001-2026', 15000.00),
(1, 1, 'FAC-002-2026', 8000.00),
(2, 2, 'FAC-003-2026', 22000.00);
GO

-- Ordenes de Compra
INSERT INTO Ordenes_Compra (FK_Proveedor, FK_Usuario, Numero_Orden, Estado) VALUES
(1, 1, 'OC-001-2026', 'Completada'),
(1, 1, 'OC-002-2026', 'Completada'),
(2, 2, 'OC-003-2026', 'Completada');
GO

-- Remitos de Ingreso
INSERT INTO Remitos_Ingreso (FK_Orden_Compra, FK_Usuario, Numero_Remito) VALUES
(1, 1, 'REM-001-2026'),
(2, 1, 'REM-002-2026'),
(3, 2, 'REM-003-2026');
GO

-- ============================================
-- VERIFICACIÓN
-- ============================================

PRINT '==================================================';
PRINT 'Base de datos GestionCompras creada exitosamente.';
PRINT '==================================================';
PRINT '';
PRINT 'Tablas creadas:';
SELECT name AS Tabla FROM sys.tables ORDER BY name;
PRINT '';
PRINT 'Verificación de datos:';
SELECT 'Proveedores' AS Tabla, COUNT(*) AS Registros FROM Proveedores
UNION ALL
SELECT 'Usuarios', COUNT(*) FROM Usuarios
UNION ALL
SELECT 'Facturas_Compra', COUNT(*) FROM Facturas_Compra
UNION ALL
SELECT 'Ordenes_Compra', COUNT(*) FROM Ordenes_Compra
UNION ALL
SELECT 'Remitos_Ingreso', COUNT(*) FROM Remitos_Ingreso;
GO

PRINT '';
PRINT 'IMPORTANTE: Ejecutar ahora el script 02_CrearStoredProcedures.sql';
GO