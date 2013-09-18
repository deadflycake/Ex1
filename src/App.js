Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{
        html:'<a href="https://help.rallydev.com/apps/2.0rc1/doc/#!/api/Rally.data.WsapiDataStore">Hint!<a>'
    },
    fireFromTheStore:function(store,records){
        var blockedRecords = _.filter(records,function(record){
            var blocked = record.get('Blocked')
            console.log(blocked,record);
            return blocked;
        });
        console.log(this);
        debugger;
        Ext.Msg.alert('Status', 'Store Loaded with '+records.length+' records and '+blockedRecords.length + ' blocked records.');
    },

    launch: function() {
        var store = Ext.create('Rally.data.WsapiDataStore', {
            model: 'User Story',
            listeners: {
                load: function(store, data, success) {
                    //process data
                    console.log(data);
                }
            },
            autoLoad:true,
            fetch: ['Name', 'ScheduleState', 'Blocked']
        });
        
        store.on("load", this.fireFromTheStore, this);
    }
});
