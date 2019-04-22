const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto = grpc.load({root: protoPath, file: 'supplier.proto' });

const client = new proto.supplier.supplier_product('127.0.0.1:8080', grpc.credentials.createInsecure());

const search = 'suchen';

const product = {
    name_product: 'MonsterValentinoRossi'
}

//Produkt und Zulieferer nach Bedarf ändern
const pref_supp_for_prod = {
    product_name: 'Rockstar',
    supplier_name: 'CocaCola'
}

client.findPreferredSupplier(product, (error, response) => {
    if(!error) {
        console.log('Praeferierter Zulieferer: ', response);
    }
    else {
        console.log('Fehler', error.message);
    }
});

client.findAllPreferredSupplier(search, (error, response) => {
    if(!error) {
        console.log("Alle praeferierte Zulieferer: " , response);
    }
    else {
        console.log("Fehler", error.message);
    }
});

client.setPreferredSupplierForProduct(pref_supp_for_prod, (error, response) => {
    if(!error) {
        console.log('Neuer Zulieferer gesetzt.', response);
    }
    else {
        console.log("Fehler", error.message);
    }
});
