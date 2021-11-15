
// Keep on checking the DB and fire event in case of CRUD operation
db.collection('receipes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(document => {
        console.log(document.doc.data())
        if (document.type === 'added') {
            renderReceipe(document.doc.data(), document.doc.id);
        }
        if (document.type === 'removed') {
            removeReceipe(document.doc.id);
        }
    })
});


