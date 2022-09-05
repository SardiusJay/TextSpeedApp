const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("button"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        // selecting "Google US English" voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        // creating an option tag passing voice name and voice language
        let option = '<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>';
        voiceList.insertAdjacentHTML("beforeend", option); //inserting option tag beforeend of select tag
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utternance.voice = voice;

        }
    }
    synth.speak(utternance); // speak the speech/utternance
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";

            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            });
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});