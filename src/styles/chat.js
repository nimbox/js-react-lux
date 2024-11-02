export default ({ theme }) => {

    const base = 300;
    const height = 50;
    const thetaRadians = Math.atan(height / base);
    const thetaDegrees = Math.round(thetaRadians * (180 / Math.PI));

    const chat = {

        '.chat-timestamp-overlay': {
            width: base,
            height: height,
            background: `linear-gradient(-${thetaDegrees}deg, rgba(160,160,160,0.8) 0%, rgba(0,0,0,0) 40%)`
        }

    };

    return chat;

};
