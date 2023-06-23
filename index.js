const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
var crypto = require('crypto')
const {usuario, incidente, validacion} = require("./dao")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(cors())
const PUERTO = 5555

app.get("/usuarios",async(req,res)=>{
    const data = await usuario.findAll()
    res.send(data)
    console.log(data)
})

app.post("/usuarios", async(req, resp) => {
    console.log(req.body)
    let esAdminBoolean="false"

    if(req.body.esAdmin=="0328"){
        esAdminBoolean="true"
    }

    await usuario.create({
        user_id: crypto.randomUUID(),
        user: req.body.user,
        pass: req.body.pass,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        celular: req.body.celular,
        fechaNacimiento: req.body.fechaNacimiento,
        id: req.body.id,
        esAdmin: esAdminBoolean
    })

    resp.send({
        esAdmin: esAdminBoolean 
    })
})

app.post("/usuarios_modificar", async(req, resp) => {
    await usuario.update({
        user_id: req.body.user_id,
        user: req.body.user,
        pass: req.body.pass,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        celular: req.body.celular,
        fechaNacimiento: req.body.fechaNacimiento,
        id: req.body.id
    },{
        where:{
            user_id:req.body.user_id
        }
    })
})

app.post("/incidente", async(req, resp) => {
    console.log(req.body)
    let id = crypto.randomUUID()
    await incidente.create({
        incidente_id: id,
        user: req.body.user,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        lugar: req.body.lugar,
        fecha: req.body.fecha,
        lat: req.body.lat,
        lng: req.body.lng,
        descripcionCompleta: req.body.descripcionCompleta,
        evidencia1: req.body.evidencia1,
        evidencia2: req.body.evidencia2,
        evidencia3: req.body.evidencia3,
        user_id: req.body.user_id,
        validacion_id: null
    })
    resp.send({
        id: id 
    })
})

app.post("/incidente_modificar", async(req, resp) => {
    await incidente.update({
        incidente_id: req.body.incidente_id,
        user: req.body.user,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        lugar: req.body.lugar,
        fecha: req.body.fecha,
        lat: req.body.lat,
        lng: req.body.lng,
        descripcionCompleta: req.body.descripcionCompleta,
        evidencia1: req.body.evidencia1,
        evidencia2: req.body.evidencia2,
        evidencia3: req.body.evidencia3,
        validacion_id: req.body.validacion_id,
        user_id: req.body.user_id
    },{
        where: {
            incidente_id: req.body.incidente_id
        }
    })
})

app.post("/validacion",async(req,resp)=>{
    console.log("incidenteValidacion")
    console.log(req.body)
    let validacion_id = crypto.randomUUID()
    console.log(validacion_id)
    await validacion.create({
        validacion_id: validacion_id,
        validacion: req.body.validacion,
        comentariosAdmin: req.body.comentariosAdmin,
        mensajeValidacion: req.body.mensajeValidacion,
        faltaEvidencia:req.body.faltaEvidencia,
        incidente_id: req.body.incidente_id
    })
    await incidente.update({
        incidente_id: req.body.incidente_id,
        user: req.body.user,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        lugar: req.body.lugar,
        fecha: req.body.fecha,
        lat: req.body.lat,
        lng: req.body.lng,
        descripcionCompleta: req.body.descripcionCompleta,
        evidencia1: req.body.evidencia1,
        evidencia2: req.body.evidencia2,
        evidencia3: req.body.evidencia3,
        validacion_id: validacion_id,
        user_id: req.body.user_id
    },{
        where: {
            incidente_id: req.body.incidente_id
        }
    })
})

app.post("/validacion_modificar",async(req,resp)=>{
    await validacion.update({
        validacion_id: req.body.validacion_id,
        validacion: req.body.validacion,
        comentariosAdmin: req.body.comentariosAdmin,
        mensajeValidacion: req.body.mensajeValidacion,
        faltaEvidencia:req.body.faltaEvidencia,
        incidente_id: req.body.incidente_id
    },{
        where:{
            validacion_id:req.body.validacion_id
        }
    })
})

app.post("/incidente_borrar",async(req,resp)=>{
    console.log(req.body.id)
    let id= req.body.id

    await incidente.update({
        validacion_id:null
    },{
        where:{
            incidente_id:id
        }
    })

    await validacion.destroy({
        where:{
            incidente_id:id
        }
    })

    await incidente.destroy({
        where:{
            incidente_id:id
        }
    })
})


app.get("/incidente",async(req,res)=>{
    const data = await incidente.findAll({
        include:validacion
    })
    res.send(data)
    console.log(data)
})

app.get("/validacion",async(req,res)=>{
    const data = await validacion.findAll()
    res.send(data)
    console.log(data)
})

app.listen(PUERTO,()=>{
    console.log("Servidor iniciado")
})