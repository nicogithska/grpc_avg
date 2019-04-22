const grpc = require('grpc');

const proto = grpc.load('proto/supplier.proto');
const server = new grpc.Server();

let Rockstar = new Object;
let CocaCola = new Object;
let Monster = new Object;

const Cola = {
        id_product: 1,
        product_name: 'Cola',
        preffered_supplier: 'CocaCola'
}

const MonsterValentinoRossi = {
        id_product: 2,
        product_name: 'MonsterValentinoRossi',
        preffered_supplier: 'Monster'
}

const RockstarGuave = {
        id_product: 3,
        product_name: 'RockstarGuave',
        preffered_supplier: 'Rockstar'
}

const products = [Cola, MonsterValentinoRossi, RockstarGuave];


const getPrefSupp = (product_name) => {
    let pref_supp = "";
    let pn = product_name;
    for(let i = 0;i < products.length; i++) {
        if(products[i].product_name == pn) {
            pref_supp += products[i].preffered_supplier;
            return pref_supp;
        }
    }
}

const getAllPrefSupps = () => {  
    let supplier_names = "";
    for(let i = 0; i < products.length;i++ ) {
            supplier_names += products[i].preffered_supplier+"; ";
    }
   
    return supplier_names;
}


const setSuppForProd = (product_name, new_supp) => {
    product_name.preffered_supplier = new_supp;
}


server.addProtoService(proto.supplier.supplier_product.service, {
    findPreferredSupplier(call, callback) {
        let product_name = call.request.name_product;
        let supplier_name = "";
        supplier_name += getPrefSupp(product_name);
        
        callback(null, {
            supplier_name
        });
    },
    
    findAllPreferredSupplier(call, callback) {
        let name_suppliers = "";
        name_suppliers += getAllPrefSupps();
       
        callback(null, {
            name_suppliers
        });
    },
    
    setPreferredSupplierForProduct(call, callback) {
        let product_name = call.request.product_name;
        let new_pref_supp = call.request.supplier_name;


        setSuppForProd(product_name,new_pref_supp);

        callback(null, {isSet: true });

    }
});

server.bind('127.0.0.1:8080', grpc.ServerCredentials.createInsecure());  

server.start();
console.log('grpc server running on port:', '127.0.0.1:8080');