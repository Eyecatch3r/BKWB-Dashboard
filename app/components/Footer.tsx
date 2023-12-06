import React from 'react';
import Image from 'next/image'

const imageStyle = {
    borderRadius: '50%',
}

const Footer = () => (
    <footer className="bg-gray-800 dark:bg-gray-700 text-white p-4 text-center">
        <div className="flex justify-between items-center mb-4">
            <a href="https://bkwb.de/" className="text-gray-400 hover:text-gray-100">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                     width="20.8000000pt" height="18.000000pt" viewBox="0 0 608.000000 410.000000"
                     preserveAspectRatio="xMidYMid meet" stroke={"currentColor"}>

                    <g transform="translate(0.000000,410.000000) scale(0.100000,-0.100000)"
                       fill="currentColor" stroke="currentColor">
                        <path d="M3280 4082 c0 -21 60 -82 80 -82 13 0 190 -179 212 -213 4 -7 8 -112
8 -234 0 -127 4 -223 9 -223 10 0 13 21 37 268 14 142 15 177 4 196 -7 14 -71
78 -143 143 -158 143 -157 142 -157 154 0 5 -11 9 -25 9 -17 0 -25 -5 -25 -18z"/>
                        <path d="M3204 4051 c-17 -4 -36 -11 -42 -15 -6 -3 -53 -20 -104 -36 -51 -16
-151 -50 -223 -75 -71 -25 -166 -57 -210 -71 -88 -29 -136 -51 -147 -68 -4 -6
-8 -33 -8 -61 0 -27 -4 -56 -9 -64 -12 -19 -92 -50 -171 -66 -36 -7 -90 -21
-120 -30 -52 -16 -168 -48 -465 -130 -71 -19 -170 -46 -220 -60 -125 -35 -321
-88 -440 -120 -55 -14 -136 -37 -180 -50 -88 -26 -212 -60 -470 -129 -93 -26
-199 -55 -235 -65 -36 -11 -85 -26 -110 -33 l-45 -13 -3 -397 c-2 -347 0 -398
13 -398 18 0 23 22 28 135 22 448 29 563 33 583 6 29 -1 27 374 138 47 14 105
32 130 39 25 8 86 26 135 41 50 14 108 32 130 39 22 7 72 22 110 33 39 11 111
32 160 47 50 15 110 33 135 40 139 39 310 90 420 124 194 60 462 139 495 147
17 3 75 21 130 39 55 18 114 36 130 39 17 4 54 17 83 28 l53 22 -26 13 c-53
29 -11 101 76 128 24 7 69 23 99 35 30 12 75 28 100 35 25 7 59 20 75 29 17 9
35 16 42 16 7 0 27 6 45 14 18 8 67 26 108 41 137 50 180 69 180 77 0 9 -12 9
-56 -1z"/>
                        <path d="M3322 3875 c-1 -11 -9 -185 -17 -387 -10 -262 -18 -373 -27 -388 -15
-25 -41 -33 -94 -28 l-39 3 -5 252 c-6 290 -1 275 -114 334 -34 18 -63 35 -66
39 -3 4 -34 22 -70 39 -49 24 -70 29 -85 23 -11 -5 -59 -22 -107 -37 -49 -15
-88 -32 -88 -37 0 -5 8 -7 18 -4 9 3 29 8 45 12 15 3 27 10 27 14 0 10 80 30
119 30 16 0 42 -10 58 -22 15 -13 35 -27 44 -33 103 -63 169 -119 170 -143 0
-9 2 -84 5 -167 2 -82 8 -179 13 -215 8 -62 8 -66 -16 -92 -17 -18 -39 -28
-71 -32 -26 -4 -78 -13 -117 -21 -38 -9 -110 -22 -160 -31 -49 -8 -121 -22
-160 -30 -38 -8 -117 -23 -175 -34 -58 -10 -172 -32 -255 -48 -82 -16 -166
-32 -185 -36 -45 -8 -59 -31 -51 -81 8 -49 29 -58 37 -15 9 43 38 59 141 75
48 8 122 21 163 29 193 40 239 50 295 63 33 8 93 21 135 28 41 8 116 23 165
35 50 11 128 27 174 35 47 8 98 19 115 25 43 13 281 60 309 60 12 0 31 6 42
14 11 7 48 17 83 21 35 4 76 11 90 15 62 19 -102 9 -170 -10 -83 -23 -143 -26
-155 -7 -4 6 -10 183 -13 392 -3 209 -7 371 -8 360z"/>
                        <path d="M4578 3283 c-21 -5 -23 -26 -4 -42 15 -13 21 -148 37 -861 10 -502
14 -608 25 -706 5 -55 4 -63 -21 -92 -15 -18 -34 -32 -43 -33 -10 0 -2 -5 16
-10 21 -6 39 -6 52 1 21 11 104 129 96 137 -2 3 -9 -5 -16 -16 -10 -21 -44
-29 -54 -13 -2 4 -6 322 -7 707 l-3 700 24 0 c26 0 34 -21 75 -190 8 -33 30
-114 50 -180 20 -66 48 -158 62 -205 34 -114 60 -254 68 -370 8 -112 12 -131
28 -124 17 6 11 294 -7 354 -33 107 -109 348 -121 380 -7 19 -32 96 -55 170
-23 74 -48 149 -56 165 -8 17 -25 70 -38 118 -14 48 -30 95 -36 103 -12 14
-37 16 -72 7z"/>
                        <path d="M4325 3249 c-164 -21 -278 -39 -283 -44 -13 -12 124 -2 253 20 77 12
135 23 128 24 -6 1 -17 3 -25 4 -7 2 -40 0 -73 -4z"/>
                        <path d="M3742 3170 c-18 -4 -36 -10 -39 -14 -11 -11 90 -5 142 9 l50 13 -60
0 c-33 0 -75 -4 -93 -8z"/>
                        <path d="M2024 2646 c-93 -21 -185 -77 -274 -166 -89 -88 -121 -151 -153 -299
-19 -91 -19 -97 -3 -180 10 -47 21 -90 27 -96 13 -13 12 5 -6 102 -39 225 75
432 299 541 67 33 102 43 184 53 123 16 258 1 340 -36 63 -29 158 -100 194
-147 18 -22 27 -28 28 -17 0 24 -128 151 -185 183 -94 53 -152 68 -275 72 -76
2 -136 -1 -176 -10z"/>
                        <path d="M2670 2361 c0 -10 6 -24 14 -30 8 -7 17 -30 21 -52 8 -45 25 -63 25
-25 0 23 -45 126 -56 126 -2 0 -4 -8 -4 -19z"/>
                        <path d="M2740 2081 c0 -56 -4 -101 -9 -101 -5 0 -15 -17 -22 -37 -21 -66 -49
-110 -109 -176 -183 -199 -554 -244 -776 -94 -58 40 -154 142 -154 164 0 6 -7
16 -15 23 -24 20 -19 -22 5 -50 11 -13 20 -26 20 -29 1 -11 84 -96 130 -133
204 -162 515 -159 730 8 102 78 170 181 201 303 20 79 26 206 9 216 -6 4 -10
-30 -10 -94z"/>
                        <path d="M5167 1919 c7 -7 15 -10 18 -7 3 3 -2 9 -12 12 -14 6 -15 5 -6 -5z"/>
                        <path d="M5220 1880 c0 -5 4 -10 8 -10 24 0 135 -131 169 -200 38 -74 38 -76
41 -214 4 -169 22 -166 22 3 0 92 -4 126 -22 175 -25 70 -86 155 -154 215 -47
41 -64 49 -64 31z"/>
                        <path d="M1440 1800 c-11 -7 0 -10 38 -10 28 0 52 5 52 10 0 13 -70 13 -90 0z"/>
                        <path d="M4782 1759 c-13 -16 -22 -35 -19 -42 3 -7 8 -5 12 8 5 11 15 28 23
38 8 9 13 19 11 21 -2 2 -14 -10 -27 -25z"/>
                        <path d="M1188 1763 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/>
                        <path d="M3926 1621 c-6 -9 37 -15 184 -26 114 -9 64 13 -57 25 -122 12 -121
12 -127 1z"/>
                        <path d="M885 1610 c-3 -5 -2 -10 4 -10 5 0 13 5 16 10 3 6 2 10 -4 10 -5 0
-13 -4 -16 -10z"/>
                        <path d="M4273 1573 c9 -2 23 -2 30 0 6 3 -1 5 -18 5 -16 0 -22 -2 -12 -5z"/>
                        <path d="M4390 1576 c0 -2 11 -6 25 -8 13 -3 22 -1 19 3 -5 9 -44 13 -44 5z"/>
                        <path d="M832 1541 c-23 -32 -39 -81 -26 -81 10 0 58 99 52 106 -3 2 -14 -9
-26 -25z"/>
                        <path d="M781 1358 c-4 -175 149 -366 422 -527 167 -98 287 -153 537 -245 190
-71 543 -169 720 -201 41 -7 134 -25 205 -38 72 -14 168 -28 215 -32 47 -4
128 -13 180 -21 109 -16 510 -19 586 -5 27 5 108 15 179 21 331 30 697 130
963 264 199 100 423 288 524 441 66 99 120 217 116 252 -4 25 -5 26 -12 8 -96
-233 -242 -393 -503 -547 -268 -158 -709 -281 -1138 -317 -372 -32 -453 -34
-700 -17 -253 18 -526 48 -635 71 -36 7 -105 21 -155 30 -180 33 -428 102
-605 167 -372 139 -633 296 -761 457 -38 48 -89 141 -89 163 0 7 -11 36 -24
63 l-24 50 -1 -37z"/>
                    </g>
                </svg>

            </a>
            <p className="text-sm">© 2023 Berufskolleg Werther Brücke.</p>
            <div className="flex space-x-4">


            </div>
        </div>
    </footer>
);

export default Footer;