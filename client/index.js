const grpc = require('grpc');

const protoPath = require('path').join(__dirname, './..', 'proto');
const proto = grpc.load({root: protoPath, file: 'supplier_leave.proto' });

const client = new proto.supplier.supplier_product('localhost:50050', grpc.credentials.createInsecure());

const suppliers = {
    CocaCola: {
        id_supplier: 1,
        supplier_name: "CocaCola",
        supplier_product: "Cola"
    },
    Monster: {
        id_supplier: 2,
        supplier_name: "Monster",
        supplier_product: "MonsterValentinoRossi"
    },
    Rockstar: {
        id_supplier: 3,
        supplier_name: "Rockstar",
        supplier_product: "RockstarGuave"
    }
}

const products = {
    Cola: {
        id_product: 1,
        product_name: "Cola",
        preffered_supplier: "CocaCola"
    },
    MonsterValentinoRossi: {
        id_product: 2,
        product_name: "MonsterValentinoRossi",
        preffered_supplier: "Monster"
    },
    Rockstar: {
        id_product: 3,
        product_name: "RockstarGuave",
        preffered_supplier: "CocaCRockstarola"
    }
}

client.findAllPreferredSuppliers(suppliers, (error, response) => {
    if(!error){
        console.log(response);
    }
    else{
        console.log('Something went wrong', error.message);
    }
});
/*
client.findPreferredSupplier(call, callback) {

},

client.setPreferredSupplierForProduct(call, callback) {

}
*/