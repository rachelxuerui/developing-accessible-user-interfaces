$(document).ready(function () {
    var text = '';

    $("*:not(body)").hover(
        function (ev) {
            $(ev.target).addClass("highlight");

            // determine the text to speak based on the element
            if (ev.target.tagName === 'IMG' && ev.target.alt) {
                text = ev.target.alt;
            } else if (ev.target.tagName === 'IMG' && !ev.target.alt) {
                text = ev.target.src; // set text to src if alt is not available
            } else {
                text = ev.target.textContent.trim();
            }

            document.addEventListener('keydown', function (e) {
                // prevent page jump when spacebar is pressed and not in input or textarea
                if ((e.code === 'Space' || e.code === 'Unidentified' || e.code === '') &&
                    ev.target.tagName !== 'INPUT' && ev.target.tagName !== 'TEXTAREA') {

                    e.preventDefault(); // prevent default action of spacebar

                    // speak
                    if (ev.target.tagName !== 'HTML') {
                        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
                        text = ''; // clear text after speaking
                    }
                    
                } else {
                    speechSynthesis.cancel(); 
                    text = ''; 
                }
            });

            ev.stopPropagation();
        },
        function (ev) {
            $(ev.target).removeClass("highlight");
            speechSynthesis.cancel(); 
            text = ''; 
        }
    );
});
