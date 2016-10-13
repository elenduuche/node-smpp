'use strict';

var smpp = require('./lib/smpp');
var session = smpp.connect('smpp://10.71.19.44:8313');
session.bind_transceiver({
    system_id: 'gemloyal',
    password: 'gemloyal'
}, function(pdu) {
    if (pdu.command_status == 0) {
        // Successfully bound
        console.log('Connected to smpp server successfully');
        session.submit_sm({
            destination_addr: '08028819034',
            short_message: 'Hello!'
        }, function(pdu) {
            if (pdu.command_status == 0) {
                // Message successfully sent
                console.log(pdu.message_id);
            }
            else{
                console.log('Failed to send the mesage:'+pdu.message_id);
                session.close();
            }
        });
    }
});

module.exports = require('./lib/smpp');
