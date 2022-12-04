const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class Departement {
  async getDepartement(req, res) {
    try {
      const page = parseInt(req.query.page) || 0;
      const limitPage = parseInt(req.query.limitPerpage) || 10;
      const search = req.query.search || "";
      const offsite = page * limitPage;
      const allRows = await Prisma.departement.count({
        where: {
          nama: {
            contains: search,
          },
        },
      });
      const findAll = await Prisma.departement.findMany({
        where: {
          nama: {
            contains: search,
          },
        },
        select: {
          id_dpm: true,
          nama: true,
          noInduk: true,
          password: true,
          role: true,
          kode_departement: true,
        },
        take: limitPage,
        skip: offsite,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
      const allPages = Math.ceil(allRows / limitPage);
      res.status(200).json({
        data: findAll,
        allRows: allRows,
        allPages: allPages,
        page: page,
        limit: limitPage,
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async getDepartementById(req, res) {
    try {
      const departement = await Prisma.departement.findUnique({
        where: {
          id_dpm: String(req.params.id),
        },
        select: {
          id_dpm: true,
          nama: true,
          noInduk: true,
          password: true,
          role: true,
          kode_departement: true,
        },
      });
      res.status(200).json({ data: departement });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async createDepartement(req, res) {
    const {
      id_dpm,
      nama,
      noInduk,
      role,
      password: textPasword,
      kode_departement,
    } = req.body;
    const password = await bcrypt.hash(textPasword, 10);
    try {
      const departement = await Prisma.departement.create({
        data: {
          id_dpm: id_dpm,
          nama: nama,
          noInduk: noInduk,
          password: password,
          role: role,
          kode_departement: kode_departement,
        },
      });
      res.status(201).json({ data: departement });
    } catch (error) {
      console.log(error)
      res.status(400).json({ msg: "Data tidak ter-input" });
    }
  }

  async updateDepartement(req, res) {
    const { nama, id_dpm, noInduk,password : textPasword, role, kode_departement } = req.body;
    try {
      const password = await bcrypt.hash(textPasword, 10);
      const updateDepartement = await Prisma.departement.update({
        where: {
          id_dpm: String(req.params.id),
        },
        data: {
          id_dpm: id_dpm,
          nama: nama,
          noInduk: noInduk,
          password: password,
          role: role,
          kode_departement: kode_departement,
          password: password,
        },
      });
      res.status(200).json({ data: updateDepartement });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  async deletedDepartement(req, res) {
    try {
      await Prisma.departement.delete({
        where: {
          id_dpm: String(req.params.id),
        },
      });
      res.status(200).json({ status: "sukses deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
}

module.exports = new Departement();
