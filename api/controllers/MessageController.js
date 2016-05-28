/**
 * MessageController
 *
 * @description :: Server-side logic for managing Messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        if (req.isSocket) {
            var reqMessage = req.params.all();
            sails.log.info(reqMessage);
            Message.create(reqMessage).exec(function (err, messageOk) {
                if (err) sails.log.error(err);
                sails.log.info('messageOk', messageOk);
                //                sails.sockets.blast('message', {
                //                    username: messageOk.username,
                //                    text: messageOk.text,
                //                    sendTime: messageOk.sendTime
                //                });
                Message.publishCreate({
                    id: messageOk.id,
                    username: messageOk.username,
                    text: messageOk.text,
                    sendTime: messageOk.sendTime
                });
            });
        } else {
            sails.log.error('Bad request');
        }
    }
};