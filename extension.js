/* Extension demonstrating a blocking command block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */

new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.send_score = function(name, score, callback) {
        $.post('http://localhost:8000/score', {
            name: name,
            score: score
        }, (data) => {
            console.log(data);
            callback();
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'Send score %s name %n score', 'send_score', '', 0],
        ]
    };

    // Register the extension
    ScratchExtensions.register('flappy bird scoreboard', descriptor, ext);
})();
