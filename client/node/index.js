const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto = grpc.load({root: protoPath, file: 'supplier.proto' });

const client = new proto.supplier.supplier_product('127.0.0.1:8080', grpc.credentials.createInsecure());

const suppliers = {
     name_supplier_1: "Coca Cola",
     name_supplier_2: "Monster",
     name_supplier_3: "Rockstar"
}

const pref_supp_for_prod = {
    product_name: 'Rockstar',
    supplier_name: 'CocaCola'
}

const products = {
    Cola: {
        id_product: 1,
        product_name: 'Cola',
        preffered_supplier: 'CocaCola'
    },
    MonsterValentinoRossi: {
        id_product: 2,
        product_name: 'MonsterValentinoRossi',
        preffered_supplier: 'Monster'
    },
    Rockstar: {
        id_product: 3,
        product_name: 'RockstarGuave',
        preffered_supplier: 'Rockstar'
    }
}

client.findPreferredSupplier(products.Cola, (error, response) => {
    if(!error) {
        console.log('Produktname: '+response.product_name);
        console.log('Praeferierter Zulieferer: '+response.supplier_name)
    }
    else {
        console.log('Fehler', error.message);
    }
});

client.findAllPreferredSupplier(suppliers, (error, response) => {
    if(!error) {
        let result = "";
        result = response.name_supplier_1+", "+response.name_supplier_2+", "+response.name_supplier_3;
        console.log("Alle praeferierte Zuliefere: "+result);
    }
    else {
        console.log("Fehler", error.message);
    }
});

client.setPreferredSupplierForProduct(pref_supp_for_prod, (error, response) => {
    if(!error) {
        console.log('Neuer Zulieferer gesetzt.');
    }
    else {
        console.log("Fehler", error.message);
    }
});