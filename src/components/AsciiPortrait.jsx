// AsciiPortrait.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AsciiPortrait = () => {
    const [displayedArt, setDisplayedArt] = useState('');
    const asciiArt = `........................    . .   .. .    .. .  ... .       ...  ................. ,....................................................................................................................
........................  ...    . .  ... ..        ..     .... ....................,...................................................................................................................
..........................  .. . ..  .   ...    . .  ..  .  . . ..................../...................................................................................................................
........................ ...... . . ..   . ...  .   .        ... .................../ ..................................................................................................................
......................... ......  .  ....... .......   .  ....   ................. .*...................................................................................................................
................................. . .... .. .... ..... ... ..........................,..................................................................................................................
.................................... ................................................*..................................................................................................................
.............................. . ..................................................../..................................................................................................................
.....................................................................................*.......................................................................................................... ..... .
................................................................................../###%#/. .   ....................................................................................... .................
................................................ ...................... ,#%%##%%%%%%%%%%%%%##%####%%#%%%%%#..................................... .................................................... ..
.................................................................... *%%%%%&%&%%%%%%%%%%%%%%%%%%%%%#%%%&%&%%............................................................................................
................................ .............................  ...(%%%%%%%%%%%%%%%%%%%%%%%%&%%%%%%%%%%%&&&%%%#... ..... . ............. .......................................................... ....
..............................................................#%%%%%%&&%%%%%%%%#,,..##/*//#(/####(///#%%&&&&&&&%%%%%#. ......... .......................................................................
............................................................%%%%%%%%%%%&%%##%%#%##,,,....,....,..,,,,,%%%&&&&&&&&&&%%%%%%%,.............................................................................
........................................................ .%%%&&%%%%%%%&&&&&&&&%%%%%#%%%%%%%#(,,*/%&#%%%%%&%%%%&&&&&&&%&%&%%#............................................................................
........................................................(&&%&&&&&&&&&&&&&%%&%%*.%%.#*.*,(#%%%%%%%%%.%%%,&,##.&&&%&&&&&%%%&&%%(. ........ ......... ........................ .... ........... ...........
...................................................... #&&&%%&&&&&&&&*/,. ,(%%%%%%%%%%&%%%%&%%%%%&%&%&&&&&&%&&&*#,%,%&&&&&&&%%# ............................................. ...................   ....
..................................................... %&&&&&&&&&&%/,,%%%%%%&%%&&&%%%%%%%&&%%%%%%%%%&%&&&&&&&&&&&&&&&&&&&%&%&&%%#............. . ......  ............ ....... ......................... .
.................................................... /%&&&%&&&&&&&&&&&&%%%%%%%%%%%%#%#%%%%%%%%%%%%%%%&%&&%&&%%&&&&&&&&&&&&&&%%%%(................. ... ........... ....  ................ ..  . .. .....
.....................................................%%&&&&&&&&&&&&&&%%%%%%%%####%%###%%%#%%#%%#%#%%%#%#%#&&&&%%&&&&%&&&&&&&&&%%%, ... ...... ....... ..... .......  ... . .  .......  ..  . . ... ...  
............................................. ......#%&&%&&&&&&&&&%%%#######%#################%###%%#%##%%%#%%%#%%%&&&&&&&%&&&&&%% .............  ..... . .   . .....  .....     .    .         ..... . 
................................................... #%&&&&&&&&%&###########%%%%%%%%%%%%%%%%%%%%%%%%%%%#%#####%#%%%%%%%%%%&&%&&%&%%(..  . . . ...    ..      . . . .   .               .  .       .    ..
.................................................. .%%&&&&&((#%#%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&%&&&&%&&%%%%%%###%#%#%%%%%%&%&&%.     ...    ...                   .                ..               
....................................................%%#%%%%%%&%&&&&@&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&%&&%%%%%%###%#%%&%# .   ...      . . .                     .                           
............................................ ...*%%%%%&%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&%%%%%%###%%&          .   . .  .        .  .                                  
...........................................,%%%%&&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&%%#(*..       .  . ..  .                                             
,.......................................%%%%&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&%&%%*.... ..........    . . .                              .      
.,................................. (%%%&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&%%#... ..................                          .         
,.,,............................./%%&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&&%%%%%&&@@@@@@@@@@&&&&&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&%%**..............  ... .    .                          
...,...........................%%&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&%%%####(((#%###(#(((##&&%%&#(((((####%%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&%%%.............  ......                            
.,...,.......................%&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&%###(((////////****/***/*(/////*//////(((((#(##%#%&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&&%%,...............    .                        
,...,......................#&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&%%%##((///****,*,,,,,,,,,,,,,,,*,,,*****///(/(((((((((#%%&&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&%(.............. .                         
.,...................... *&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%&&@@&&%%((//***,,,,,,,,,,,,,,,,,,*******//(#(@&&@&&%%&&&&&&&&&&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&&&%(.............                         
.,.....,................#&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&##%%%&&@&@%&@%&#(//***,,,,,,**///(%#%&&&@@&%&%#((((((####%%%%%%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%*.......  ....            .          
,,,,...................#&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&##((/////////((##((////****,,****/(####%%%%%%#(////((#%%%########%%&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%/.......... ...                     
.,,...,......,*,*,....(&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%#((((#(#(/*****(#((((///***,,,,**//((###%(((#@&@@@%&&%%%%%###(((####%&@&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&&,.......  ... .  .      .           
,,,..,................%&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&%%##(((////##&&*&@&%((((((**,,,,,,*/(#((#(%%/**&&&%%//((#%##(////((((#%%&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&#.......... ..... .    .             
,,...................#&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%##((((#&&%(/*%&&&%#**(/(*//*,,,,,**/(((/(/*,****,//#(#(((((/////////((##&&%&@@@@@@@@@&@@@@@@@@@@@@@@@@@@&,...................   .        .     
,,...................#&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%((/**///(((/****/**///**//***,,.,,*//(////**////////((////*******////((#%&&@@@@@@@@@&@@@@@@@@@@@@@@@@@&#....................... ..             
,..,..,.............*,&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#(//****/////(///////*********,,.,,*////*****,,,*****************/*///(((%%%&@@@@@@@@@@@@@@@@@@@@@@@@&#.,....................   ... .           
,.,,,............*,,,,,&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&///*************,****,,,*****,,.,,*////*****,,,,,,,****,,*********///((####&@@@@@@@&&@@@@@@@@@@@&&/....,.,,....................  ....     .    
,,............*,,,,,,,,,%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&(//*****,,*,,****,,,,,,,*****,,,,,**///*****,,,,,,,,,,,,,,,******////(((((#@@@@@@@@#&@@@@@@@@&%,,,,,,,.,..,,....................... .  .     . 
..........,,,,,,,,,,,,,***#&@@@@@@@@@@@@@@@@@@@@@@@@@@@&&@//***,,,,,,,,,,,,,,,,,,******,,,,**//////***,,,,,,,,,,,,,,*****////((((((@@@@@@@@@&%@@@&&(,**,,,,,,,,,,,,,,,..........................  .     
...,,,*,,,,,,,,,,,**,,****//(&@@@@@@@@@@@@@@@@@@@@@@@@@@%&@(/***,,,,,,,,,,,,,,,,******,,..,,**///////**,,,,,,,,,,,,*****////((((/@@@@@@@@@@&%#//***********,*,,,,,,,,,.,...................... ..    .  
.,,,,,,,,,,,,,,,,*****,,**//((##(&@@@@@@@@@@@@@@@@@@@@@@@@@%/***,,,,,,,,,,,,,,,,**/****,..,,****////(/*,,,,,,,,,,,******/////(((@@@@&/(((///&%////************,,,,,,,,,,,.,.,..................... ..  .
****,,,,,,,,,**************/****/**//#(((##&@@@@@@@@@&%%%&##%//****,,,,,,,,,,,,,,*****,,,..,,,***////(/***,,,,,,,******/////((((##((((((((((&%//////***********,,,,,,,,,,.,.,........................  .
******,,,,**********,,********,,**,****/////(##&&#(((//((&@#%%///***,,,,,,,,,,,,*****,,,,,,,,***/(((((/****,,,,*******///(((((((###(((((((((&&/////*******,,,,,,,,,,,,,,.,,.......,..................   
******,***********************,,,,,,*****////(((((((((((#&@&*,,///****,,,,,,,,,,**(#(/**,*****((##(//*******,******//////((((((####(((((((//&&/*********,,,,,,,,,,,,,,,.,,........................... . 
********////*/*/******/////***,,,,*****//////((//((###%*,,&&,,,*(//****,,,,,,,,,,,***/((////(###(////**********///////(((((((((((((((((////*&#****,,,,,,,,,,,,,,,,,,.................................. .
***/*///////////***/////////*****/*///////(((//((%%/,,,,,,@@,,,**(//****,,,,,*,,,,,****////((//*////********//////(/((((((((((((((((//////**@#**,,,,,,,,,,,,,,,,,.,.............................. . .   
&///////////////////((((((((//((((((########(((%,,,,,,,,,*&@,****/(///*********************/*/******//******///((((((((((((((#((((////////**@***,,,,,,,,,,,,,,,,,............................  . .. ..  
#*&(/////((((///((#####%%%%%%%%&&&#/,...,.....,,,,,,,,,,,,%@*******((//////*******************,,,,*******///(//(((((((((((##(#/((////////**%%,,,,,,,,,,,,,,,.,.,,.......................... ...       . 
/%(((((((((((((#%%&%.......................,,.,,,,,,,,,**,,@&*******(((/////////**********,,,,,*/(###%###%%#(((((((((((#####((%#///////****@%,,,,,,,,,,,,,.,.,........................ .. .  . .        
(&(&%###(#(##%%(*........................,,,,,,,,,,,**,*,*,&@********/((///(////(#((##%#%#######(,,///////(/((((((((########((%*%////*/****%&,,,,,,,,,,.,,,,,.........................    ..  .         
/&#&%#####%%,.........................,,,,,,,,,,,***********@%******,*,(((//(((((////((//*,,**/,///((((#((/((((##(####%####(((#,//(&(******%%,,,,,.,,,..,,......,...................... ..    .   ...   
(%@ &&/%%*...................,....,,,,,,,,,,,*,*******,*,*,*%&,,*,,,,,,,(##(((((((//((((((((//*////(((%#(((##########%%###(((%,//#&&&&&&@&&@&,,,,,.,,,,..,,.,....................... .. ..... ..       .
#%%@ &&...............,....,..,,.,,,,,,,,,,,,,****,**,,*,*,*(&&,,,,,,,,,/,(####((((((((###((((((#%&%################%####((((,*, %&&&&&&&&&%&&&%&&&%*,.,.,,........................... ....   .         
#%&@ &%....,......,....,.,,,,,,,,,,,,,,,,,,******,,,,,,,*,,,,#&,,,,,,,,/(,/(###((((#(#(((((((((/(///////(((((((((##%#%##((((,./,*%@&&&&&&&%@&&&&&&&&&&&&%%&%%%/..................... ....... .  ... .   
%&&%%,....,...,..,,,,,,,,,,,,,,,,,,,,,,*,*,******,,,,,,,,,,,,(%/,,,.,/,(,.,///#(((((/(///******//*****////((((((##%%##(((/(*.*,,@&&&@&&&&&&%&&&&&%&&&&%&&&&%%%&&%%%&%%%%%%%%%%%%%%%%*  /%%##..  . ..    
*&%....,,.,,...,,,.,,,,,,,,,,,,,,,,,,,,,******,,,,,,,,,,,,,,,,&&&&&////#,../////(#((////////////////////(((((((#%%#(((((/&/.*/,&@,#@&&&&&&@@&&&&&%&&&&&&&&&&%%&%%%%%%%%%%%%%&%%%%%%%%%%%%%%&%#  .....   
,...,,.,.,.,,,,.,,,,,,,,,,,,,,,,,,,,,,*,**,,,,,,,,,,,,,,,,&&@&@&&&&&///#....///////(((((/(////((((///(((((((#%%###((&@&@@%.....&&#@&&&&&&&&%&&&&&&&&&&%&%&&&&%&&&&&%&%%%%%%%%%%%%%%%%%%%%%@&&&&&%%%,.  .
..,.,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,*,***,*,,,*/(((**&@@&&&&&@&@@&&&&, %....#/***/////(#(####(#%%%%#%##%%&&&@@@@@@@@@@@@&.,*..*&*%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%&%%&%%&%&%%%%&&&@&&%%%&%%*.
....,,,,,,,,,,,,,,&&%%%%&&&%%&&%&&%%&&&&&&&&&&&&@&@&&&&%%%&&@&&&@&&&&/(@.....&&&&&&%#((((##%&@@@@@@@@@@@@@@@@@@@@@@@&&&&.*.**.@%/(@@&&@&&@@&&&&&&&&&&&&&&&&%&&&&&&&%&&%&%&&%%%%%%&&&&&%%%&&&&&%%%&&&&&%%
..,,.,,,,./&&@&&%&&&&&&&&&&&&%&&&&&&&&&&&&&&&&&&&&&&@@%@&&&&&&&@&@@@&,/&.....&&&&&&&&@&&@@@@@@&@@@@@@&@&@@&&&&&@@@@@@&& ..../.& ##@@@@@@@%%%@@&@&&@@@@&@&&&&&&&&&&@@@&%%&&&%&%&&&&&&&&%%%&&&&&&&&&&&%%&&
,,,,,,,.&&@@&&@&&&&&&&&&&&&&&&&&&&&&&&&&&@@@@@&&&@&&%@&&@&&&&&&&@@&&&*##.....@&&&&&&&&&&&&&&&&&&@@&&&&@@@@@@@&&&&&&&&&,......@&#(@@@@@@@@%&@&@@@&@@&@&&@&&&&@@&&&@&@@&&&@@@&%%&&&&&&%&&&%&&&&&&@&&&%&&&&
..@@&@@@@&@@@@@&&&&&&&&&&&&&&&&@@&&&&@@@&&@@@@@@@@@@@&&&@@@@@&&&@@&&&/&@.....&&&&@@@@@@@@@@@@@@@@&&&&&&&&&&&&&&&@&&&&%.*/....@#/&@@@@&@@&@&@@@@@@@@@&@@&&@@@&@@@&@@@@&&&&&&&&&&&&@@%&&%&%&&&&@@&%%&&@&%%
&&&&@@@&@&&@@@@&&&&&@@@@@@@@@@@@&&&@@@@@@&&@@@@@@@@@@@&&@@@@@@@@@&@@@*#*.....#&&&&&&&&&@@@&@@@&&&&&&&&&&&&&&&&&&&&&&&.......@&/,@@@@@@@@&%&@@@@@@@@@@@&&&@@&&&@@&@&&&&&&&&&&&@&@&&&&&@&&%&&&@&%%&&@@&&&&
@@&@@@@@@@&@@@&&@&@@@&@@@@@@@@@&&&&&&&&@&@&&@@@@@@@@@@@@@@@@@@@@@%@&@@,,...../@@&&&&&&&&&&&&@&@@@@@@&@&&&&&&&&&@&@@@....***.&,/%@@@@@@@@@@@@@@@@@@@@&@@@@@@@@&&&@&@&&&&&&&&&&@@&&@%&&&%%&@@&&&&@@&&&&&&&
@@@@@@@@@@@@&@@@@@@@&&@&&@@@@@&@&&&&&&@@&@&@&@@@@@@@@@@@@@@@@@@@@&@@@@(......,@@@@@@&&@&&&&&&&&&@@@@@@@@&&@&&@@@@@@&.......&,%%,@@@@@@@@@&@@@@@@@@@@@@@@@&&&@&@@@@&&&&%&&&&&&&@&&&&@&&&&%@&&@&&&&&%&&&&%
&@@@@@@@@@@@@@@@&@@@&&&&&&@@@@@&&&&&&&&@&@&@@@@@@@&&&&@&&@@@@@@@@&%@@@*.......@@@@@@@@@@@&&&&&&&@@@@@@@@@@@@@@@@@@%....(/.,#%#@@@@@&@@@@%@@@@@@@&&&@&&&&&&&&&@@@@@&&&&&&&&&@@&&&&&@&@&&&&@&&&&&&&&&&&&&@
&@@@@@@@@@@@@&@@@@@@@&&&&&@&@@@@@&&&&&&&&&&&&@@@@@@&&&&&&@&@@@@@@&@@@@,.......&@@@@@@@@@@@&&&&&&&&@&&@@@@&@@@@&&&&,.......@&/%#@@@@@@&@&@&@&&&&&&@@&&&&&&&&@@@@@@&&&&&&&&&&&@&&&&&@&&&&&&&@&&&&&&&&&&&@@
&&@@@@@@@@@@@@@@@@@@@@@&&&&@@@@@@@&&&&&&&&&&@@@@@@@@&&&&&&&@@@@@@@&&@@%.......&&&&&&&@&&@@&&@@&&&&@&&&&&@&@&&&@&&&.......,(,%&@@@&@&@@&&&&&@&&@@&@@&&&&&&&@&@@@@&&&&&&&&&&@@@&&&&&@&&&&&&&&&&&&&&&&&@@&@
@@@@@@@@@@@@@@@&&@&@@@&@&&&&@@@@@@@&&&&&&&&&&&&@@@@@@&&&&&&&&@@@@@@&&@@...,,..@&&&@&&&@&&&@&&&&&&&&&&&@&&&&@&&&&&....,,..%(#%@@@@@@@&&@@&&@&&@&&&&&&&@&&@&@@@@@&&&&&&&&&&@@&@@&&&&&&&&&&&&&&&&&&&&@&@&&&
@@@@@@@@@@@@@@@&&@@@&@@@&&&&&@@@@@@@@@&&&&&&&&&&@@@@@@@&&&&&&&&@@@@@%&&.,.,,..@@&@&&&&&&&&&&@@&&&&&&&&&@&&&&&&&&...*,/..#&/#%@@@@@@&@&&%&&&&&&&&&&&&&&&&@&@@@@&&&&&&&&&@@@@@@&@&&&&&&&&&&@&&@&&&&@@&&&&&
@@@@@@@@@@@@@@@&@@@@@@&&&&&&&@@@@@@@&&&&&&&&&&&&&@@@@@@@&@&&&&&&@@@%@&@..,,,,,%@@@@&&&@&@&&&&&&&&@&&@&&@&&&&&&&#........((*&@@@@@&&&&@@@&&@&&&&&@&&&&&&&&@@@@&&&&&&&&&&&&@@@&@@&&&&&&&&&@&&&&&@@&&&&&&%&
@@@@@@@@@@@@@@@&@@@@@@&&@&&&&&&@@@@@@&&&&&&&&&&&&@@@@@@@@@@&&&&&@@@@@&@.,,,.,..@@&&&&@&@&&&&@&@&&&&&@&&@&&@@&&%..**,...&(#&&@@@@@&&&@&&@@&&&&&@@&@&&&&&&@@@@&&&&&&&@&&&&@@@@&&&@&&&&&&&&@@&&&@&&&&&&&&&%
@@@@@@@@@@@@@@@&@@@@@&@@&&&&&&@@@@@@@@@@&&&&&&&&&&@@@@@@@@&&&&&&&&@&%@@.,,,,,, @&@@@@@&&&&&&&&&&@&&@&&@@&&&&&&...,,...#%,##@@@&&&&&@&@@@@&&@&@@&@@&&&&@@@@@&@&&&&&&&&&&@@@@@&&@&&&&&&&&&@&@@&&&&&&@@&&@&
@@@@@@@@@@@@@@@@&@@@@@@@@&&&&&&@@@@@@@@@@&&&&&&&&&&@@@@@@@@@&&&&&&&&@%@.,,,,,,.@@@@@@@@@@&&&&&&&@&&@@&&@&&&&&/..,*/...#%%%@@@@&@@&@@@&&&@&@@@&&@&&&&@@@@@&@&&&&&&&&&&@@@@@@@&@&&&&&&&&&@@@@&&&&&@@@@&@@@
@@@@@@@@@@@@@@@&@&@@@@&@@&&&&&&@&@@@@@@&@&&&&&&&&&&&&@@@@@@@@&&&&&&&&@&,,,,,,,.@@&@@@@@&@&@@@&&&@&@@&&@@&&&&&.,/,*,..@@/&%@@@@@@&&@@@@@&@@@@&&&&&&&&@@@@@@@&&&&&&@&&@@&@@@&@&&&&&@&&&&@@@@@@@@@&@@@@&&@&`;
  
useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < asciiArt.length) {
        // Add multiple characters at once for faster typing
        const chunkSize = 30; // Increase this number to type more characters at once
        const chunk = asciiArt.slice(currentIndex, currentIndex + chunkSize);
        setDisplayedArt(prev => prev + chunk);
        currentIndex += chunkSize;
      } else {
        clearInterval(typingInterval);
      }
    }, 1); // Reduced from 15 to 1ms for maximum speed

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <pre 
      style={{
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        lineHeight: '1',
        fontSize: '4px',
        color: '#000000',
        textAlign: 'center',
        margin: '0 auto'
      }}
    >
      {displayedArt}
    </pre>
  );
};

export default AsciiPortrait;
