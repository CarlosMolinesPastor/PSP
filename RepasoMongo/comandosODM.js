//ODM

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bd');

//######################## Esquema y modelo ############################
let esquema = new mongoose.schema({
    nombre: String,
    apellidos: String,
    matriculas: Number,
});

let modeloEsquema = mongoose.model('coleccion',esquema);

// ## Se puede hacer todo junto esquema y modelo ##//

let modeloEsquema2 = mongoose.model('coleccion', {
    nombre1: String,
    apellidos1: String,
    matriculas1: Number
})

//############################# Insertar ################################

//Primero creamos una instancia del modelo por cada insercion

let variable1 = new modeloEsquema({
    nombre: "xxxxxxx",
    apellidos: "xxxxxxx",
    matriculas: 2,
});
let variable2 = new.modeloEsquema({})

//EL objeto variable1 tiene un metodo para guardar el objeto

variable1.save().then(
    result => {
        console.log("Mensaje", result);
    }
).catch(
    error => {
        console.log("Mensaje Error: ", error);
    }
);

variable2.save().then(
    result =>{
        console.log("Mensaje Result", result);
    }
).catch(
    error =>{
        console.log("Mensaje Error", error);
    }
);

//############################# Operadores ################################
//
// $eq =
// $ne Distinto
// $gt >
// $gte >=
// $lt <
// $lte <=
// $in que se encuentren en un array
// $exists que existe el campo
// $or que cumpla alguna de las condiciones, se coloca al inicio
// $and que cumpla todas las condiciones

//############################# Busqueda ################################

//Busqueda Global
modeloEsquema.find({}).then(
    result => {
        console.log("Mensaje", result);
    }
).catch(
    error =>{
        console.log("Mensaje", error);
    }
);<document|str

modeloEsquema.find({nombre:"xxxxxxx"}).then(
    result => {
        console.log("Mensaje", result);
    }
).catch(
    error => {
        console.log("Mensaje", error);
    }
)

//Matriculas mayor que 2
modeloEsquema.find({matriculas: {$gt: 2}}).then(
    result => {
        console.log("Mensaje", result);
    }
).catch(
    error => {
        console.log("Mensaje", error);
    }
);

//Campo nombre existe
modeloEsquema.find({nombre: {$exists: true}}).then(
    result => {
        console.log("Mensaje",result);
    }
).catch(
    error => {
    console.log("Mensaje",error);
    }
);

//elementos que se llamen Juan o Pepe
modeloEsquema.find({nombre: {$in: ["Juan", "Pepe"]}}).then(
    result =>{
        console.log("Mensaje", result);
    }
).catch(
    error=>{
        console.log("Mensaje",error);
    }
);

//Elemenos que cuyo nombre sea Juan y tenga mas de 2 matriculas
// ## Ojo que or y and van al principio
modeloEsquema.find({$or:[{nombre:"Juan"},{matriculas:{$gt:2}}]}).then(
    result =>{
        console.log("Mensaje", result);
    }
).catch(
    error => {
        console.log("Mensaje", error);
    }
);

//########################### Actualizacion ###############################

// 1. findByIdAndUpdate, tiene tres parametros:
//   - Identificador a buscar
//   - Operadores de actualizacion $set
//   - Opciones adicionales: new devuelve true(actualizado) false(anterior).

//Actualiza los apellidos del id siguiente  y muestra el actualizado
modeloEsquema.findByIdAndUpdate('659494e0d2c39f1735441421',
                                {$set: {apellidos:'yyyyyy'}},
                                {new: true}).then(
                                    result => {
                                        console.log("Mensaje actualizado new true", result);
                                    }
                                ).catch(
                                    error =>{
                                        console.log("Mensaje Error",error);
                                    }
                                  );


// 2. findOneAndUpdate<document|str
//   - El primer parametro permite filtro de busqueda
//   - Solo se modifica un documento

// Actualiza numero de matrivculas de 2 a 5
modeloEsquema.findOneAndUpdate({matriculas: 2},
                                {set: {matriculas: 5}},
                                {new: false}).then(
                                    result => {
                                       console.log("Mensaje Documento antes new false", result);
                                }
                                ).catch(
                                    error =>{
                                        console.log("Error", error)
                                    }
);

// 3. UpdateOne / UpdateMAny
//   - Primer parametro es el de busqueda
//   - No devuelven el documento actualizado, sino el numero de documentos actualizados
//DUDAAAAAAA NEw aqui dasria igual?????????

// Nos dice los documentos actualizados en los que los apellifos eran xxxxxxx y ahora son yy
modeloEsquema.UpdateMAny({apellidos: "xxxxxxx"},
                         {$set: {apellidos: "yy"}}
                         ).then(
                             result =>{
                                 console.log("Mensaje numero de documentos: ", result);
                             }
                           ).catch(
                               error =>{
                                   console.log("Mensaje", error);
                            }
);

modeloEsquema

//########################### Borrado ###############################

// 1. findByIdAndRemove
//    - Identificador a buscar devuelve el documento eliminado

modeloEsquema.findByIdAndRemove('659494e0d2c39f1735441421').then(
    result => {
        console.log("Documento eliminado: ",result);
    }
).catch(
    error =>{
        console.log("Error: ", error);
    }
);

// 2. findOneAndRemove
//   - Criterio de busqueda como primer parametro
//   - Elimina el primer valor que encuentra

modeloEsquema.findOneAndRemove({nombre:"xxxxxxx"}).then(
    result =>{
        console.log("Documento eliminado",result);
    }
).catch(
    error =>{
        console.log("Error: ", error);
    }
);

// 3. deleteOne / deleteMAny
//   - Primer parameteo criterio de busqueda
//   - No devuelve el documento sino los numeros de documentos elimninados

//Elimina todos los `
modeloEsquema.deleteMany({$and: [{nombre: "xxxxxxx"},{matriculas: {$lte: 4}}]}).then(
    result => {
        console.log("Num Doc Eliminados: ", result);
    }
).catch(
    error =>{
        console.log("Error:" , error );
    }
);






