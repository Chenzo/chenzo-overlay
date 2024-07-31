import { io } from 'socket.io-client'


export const getSocket = function(setCurrentAudio, setHeadType, setSunkShipArray, setCurrentAlignment, setPushedImage) {
    let socket;
    let socketInit = false;

    const socket_user_name = 'thbar_obs';
    //const socket_room = 'panel_remote';
    const socket_room = 'teaxc64in';

    const handleNoConnect = function(err) {
        console.log('connection error (error commented out)');
        //console.log(err)
    };

    const onConnect = function() {
        console.log("Connected to Socket I/O Server!!!");
        socket.emit('joinRoom', {
            name: socket_user_name,
            room: socket_room
        });
    };


    const onToAuxEvent = function(evtData) {
        console.log("received ToAuxEvent!!");
        //console.log(evtData);

        if (evtData.event == "playaudio") {
            setCurrentAudio(evtData.target);
        }

        if (evtData.event == "overlaycommand") {
            console.log("DO THE THING - overlaycommand")
            setHeadType(evtData.target);
        }

        if (evtData.event == "addcrew") {
            console.log("trying to add crew");
            //displayOBJ.addCrew(evtData.target);
        }

        if (evtData.event == "removecrew") {
            //displayOBJ.removeCrew(evtData.target);
        }

        if (evtData.event == "addsnake") {
            console.log("George Found")
            //displayOBJ.addSnake(evtData.target);
        }

        if (evtData.event == "removesnake") {
            console.log("George Died")
            //displayOBJ.removeSnake();
        } 

        if (evtData.event == "imagePush") {
            console.log("pushing image");
            setPushedImage(evtData);
        }
    }


    const onAnEvent = function(theEventDat) {
        console.log("received event!!");
        console.log(theEventDat);

        if (theEventDat.event == "shipsunk" || theEventDat.event == "shipresunk" 
        || theEventDat.event == "shipsunk-flag" || theEventDat.event == "shipresunk-flag"
        || theEventDat.event == "factionshipsunk" || theEventDat.event == "factionshipsunk-flag") {
            console.log(theEventDat.ship);
            let daShip = theEventDat.ship.split("-")[0];
            console.log(daShip);
            setSunkShipArray(sunkShipArray => [...sunkShipArray, daShip])
            
        }

        if (theEventDat.event == "setAlignment") {
            console.log(theEventDat.ship)
            setCurrentAlignment(theEventDat.ship);
        } 
        /* 
        if (theEventDat.event == "playaudio") {
            console.log("I'm here... this should be it?");
            console.log(theEventDat.ship);
            displayOBJ.playAudio(theEventDat.ship);
        }

        */
    }

    const initSocket = () => {
        if (!socketInit) {
            socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER);
            socket.on('connect_error', handleNoConnect);
            socket.on("connect", onConnect);
            socket.on("toAuxEvent", onToAuxEvent);
            socket.on("anEvent", onAnEvent);
            socketInit = true;
            return socket;
        }
    }


    return initSocket();
    
};