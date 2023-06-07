const { Sequelize, DataTypes } = require("sequelize");

// postgres://<USUARIO>:<PASSWORD>@<URL_HOST_BD>:<PUERTO_BD>/<NOMBRE_BD>

const CADENA_CONEXION = 
    "postgresql://alerta_municipalidad:postgres@localhost:5432/alerta_peru_db"

const sequelize = new Sequelize(CADENA_CONEXION)

const usuario = sequelize.define("usuario", {
    user_id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    user : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    pass : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    id : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    nombres : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    apellidos : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    celular : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    fechaNacimiento : {
        type : DataTypes.STRING(200),
        allowNull : false
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const incidente = sequelize.define("incidente", {
    incidente_id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    user : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    titulo : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    descripcion:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    tipo : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    lugar : {
        type : DataTypes.STRING(200),
        allowNull : true
    },
    fecha : {
        type : DataTypes.STRING(200),
        allowNull : true
    },
    lat : {
        type : DataTypes.STRING(200),
        allowNull : true
    },
    descripcionCompleta:{
        type : DataTypes.STRING(200),
        allowNull : true
    },
    evidencia1:{
        type : DataTypes.STRING(200),
        allowNull : false
    },
    evidencia2:{
        type : DataTypes.STRING(200),
        allowNull : false
    },
    evidencia3:{
        type : DataTypes.STRING(200),
        allowNull : false
    },
    user_id:{
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    validacion_id:{
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    lng : {
        type : DataTypes.STRING(200),
        allowNull : true
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const validacion = sequelize.define("validacion", {
    validacion_id : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    },
    validacion : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    comentariosAdmin : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    mensajeValidacion:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    faltaEvidencia : {
        type : DataTypes.STRING(200),
        allowNull : false
    },
    incidente_id:{
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4
    }
}, {
    timestamps : false,
    freezeTableName : true
})

// Relaciones
usuario.belongsTo(incidente, {
    foreignKey : "user_id"
})

incidente.belongsTo(validacion, {
    foreignKey : "validacion_id"
})



module.exports={
    usuario, incidente, validacion
}