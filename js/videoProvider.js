const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let peerConnection;

// Function to set up the local video stream
async function setupLocalVideo() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
}

// Function to create and set up the peer connection
function createPeerConnection() {
    const configuration = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    };
    peerConnection = new RTCPeerConnection(configuration);

    // Add local stream to peer connection
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Set up event listeners
    peerConnection.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            sendIceCandidate(event.candidate);
        }
    };

    peerConnection.onnegotiationneeded = async () => {
        try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            sendSdpOffer(offer);
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };
}

// Function to send SDP offer to the remote peer
function sendSdpOffer(offer) {
    // Simulate sending offer to the remote peer (replace with actual code)
    setTimeout(() => {
        handleSdpAnswer({ type: 'answer', sdp: 'sample-answer-sdp' }); // Simulated response
    }, 1000);
}

// Function to handle SDP answer from the remote peer
function handleSdpAnswer(answer) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
        .then(() => {
            console.log('Remote description set successfully.');
        })
        .catch(error => {
            console.error('Error setting remote description:', error);
        });
}

// Function to send ICE candidate to the remote peer
function sendIceCandidate(candidate) {
    // Simulate sending ICE candidate to the remote peer (replace with actual code)
    setTimeout(() => {
        handleIceCandidate({ candidate: 'sample-ice-candidate' }); // Simulated response
    }, 1000);
}

// Function to handle ICE candidate from the remote peer
function handleIceCandidate(candidate) {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        .then(() => {
            console.log('Remote ICE candidate added successfully.');
        })
        .catch(error => {
            console.error('Error adding remote ICE candidate:', error);
        });
}

// Initialize the video call
async function initVideoCall() {
    await setupLocalVideo();
    createPeerConnection();
}

// Call the initialization function when the page loads
window.onload = initVideoCall;
