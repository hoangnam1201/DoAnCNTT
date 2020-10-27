CREATE TABLE [GiangVien] (
  [MaGV] char PRIMARY KEY,
  [TenGV] nvarchar(255),
  [NgaySinh] datetime,
  [Phonenumber] numeric,
  [Phai] nvarchar(255),
  [Nganh] char
)
GO

CREATE TABLE [Nganh] (
  [MaNganh] char PRIMARY KEY,
  [TenNganh] nvarchar(255),
  [MoTa] nvarchar(255),
  [TrgNganh] char
)
GO

CREATE TABLE [MonHoc] (
  [MaMH] char PRIMARY KEY,
  [TenMH] char,
  [MoTa] nvarchar(255),
  [Nganh] char,
  [DauRa] nvarchar(255),
  [DeCuong] nvarchar(255),
  [LoaiMonHoc] char,
  [SoTiet] numeric,
  [SoTinChi] numeric,
  [PP_DGia_KThu] char
)
GO

CREATE TABLE [Lop] (
  [Malop] char,
  [MaMH] char,
  [NamHoc] integer,
  [HocKy] char,
  [GiangVien] char,
  [TietBatDau] numeric,
  [Phong] nvarchar(255),
  [SVToiDa] integer,
  PRIMARY KEY ([Malop], [MaMH], [NamHoc], [HocKy])
)
GO

CREATE TABLE [LoaiMonHoc] (
  [MaLoaiMH] char PRIMARY KEY,
  [TenLoaiMH] nvarchar(255)
)
GO

CREATE TABLE [PP_DGia_KThu] (
  [pp_id] char PRIMARY KEY,
  [TenPP] nvarchar(255),
  [MoTa] nvarchar(255)
)
GO

ALTER TABLE [GiangVien] ADD FOREIGN KEY ([Nganh]) REFERENCES [Nganh] ([MaNganh])
GO

ALTER TABLE [Nganh] ADD FOREIGN KEY ([TrgNganh]) REFERENCES [GiangVien] ([MaGV])
GO

ALTER TABLE [MonHoc] ADD FOREIGN KEY ([Nganh]) REFERENCES [Nganh] ([MaNganh])
GO

ALTER TABLE [MonHoc] ADD FOREIGN KEY ([PP_DGia_KThu]) REFERENCES [PP_DGia_KThu] ([pp_id])
GO

ALTER TABLE [MonHoc] ADD FOREIGN KEY ([LoaiMonHoc]) REFERENCES [LoaiMonHoc] ([MaLoaiMH])
GO

ALTER TABLE [Lop] ADD FOREIGN KEY ([MaMH]) REFERENCES [MonHoc] ([MaMH])
GO

ALTER TABLE [Lop] ADD FOREIGN KEY ([GiangVien]) REFERENCES [GiangVien] ([MaGV])
GO

