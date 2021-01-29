import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="Footer">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="https://twitter.com/mount_carlo"
                       target="_blank" rel="noopener noreferrer">
                        <svg className="icon twitter-icon" role="img" viewBox="0 0 24 24">
                            <title>Twitter</title>
                            <path
                                d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                        </svg>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="https://github.com" target="_blank"
                       rel="noopener noreferrer">
                        <title>Github</title>
                        <svg className="icon github-icon" role="img" viewBox="0 0 24 24">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                </li>
                {/*<li className="nav-item">*/}
                {/*    <a className="nav-link" href="/" rel="noreferrer">*/}
                {/*        <title>Mount Carlo</title>*/}
                {/*        <svg className="icon mountcarlo-icon" role="img" xmlns="http://www.w3.org/2000/svg"*/}
                {/*             width="24" height="24.284" viewBox="0 0 24 24.284">*/}
                {/*            <g id="Group_4" data-name="Group 4" transform="translate(-572 -507)">*/}
                {/*                <g id="Component_4_1" data-name="Component 4 – 1" transform="translate(572 507)">*/}
                {/*                    <g id="Group_3" data-name="Group 3" transform="translate(-571 -507)">*/}
                {/*                        <g id="Component_2_1" data-name="Component 2 – 1"*/}
                {/*                           transform="translate(571 507)">*/}
                {/*                            <g id="Polygon_1" data-name="Polygon 1" fill="none">*/}
                {/*                                <path d="M12,0,24,23.3H0Z" stroke="none"/>*/}
                {/*                                <path*/}
                {/*                                    d="M 12 2.183954238891602 L 1.639898300170898 22.29864311218262 L 22.3601016998291 22.29864311218262 L 12 2.183954238891602 M 12 3.814697265625e-06 L 24 23.29864311218262 L 0 23.29864311218262 L 12 3.814697265625e-06 Z"*/}
                {/*                                    stroke="none" fill="#fff"/>*/}
                {/*                            </g>*/}
                {/*                            <line id="Line_4" data-name="Line 4" x1="6.352" y2="19.884"*/}
                {/*                                  transform="translate(5.5 2.616)" fill="none" stroke="#fff"*/}
                {/*                                  strokeWidth="1"/>*/}
                {/*                            <path id="Path_2" data-name="Path 2" d="M6.189,19.622,0,0"*/}
                {/*                                  transform="translate(12.246 2.878)" fill="none" stroke="#fff"*/}
                {/*                                  strokeWidth="1"/>*/}
                {/*                            <g id="Polygon_2" data-name="Polygon 2" transform="translate(9.057 19)"*/}
                {/*                               fill="#fff">*/}
                {/*                                <path*/}
                {/*                                    d="M 5.145886421203613 4.78444242477417 L 0.8591662645339966 4.78444242477417 L 3.002522706985474 1.012131571769714 L 5.145886421203613 4.78444242477417 Z"*/}
                {/*                                    stroke="none"/>*/}
                {/*                                <path*/}
                {/*                                    d="M 3.002523422241211 2.024260759353638 L 1.718326091766357 4.28444242477417 L 4.286716461181641 4.28444242477417 L 3.002523422241211 2.024260759353638 M 3.002524852752686 2.384185791015625e-06 L 6.005044937133789 5.28444242477417 L -5.245208740234375e-06 5.28444242477417 L 3.002524852752686 2.384185791015625e-06 Z"*/}
                {/*                                    stroke="none" fill="#fff"/>*/}
                {/*                            </g>*/}
                {/*                        </g>*/}
                {/*                    </g>*/}
                {/*                    <path id="Path_1" data-name="Path 1" d="M-.01.557.08,21.466"*/}
                {/*                          transform="translate(12.01 0.472)" fill="none" stroke="#fff"*/}
                {/*                          strokeWidth="1"/>*/}
                {/*                </g>*/}
                {/*            </g>*/}
                {/*        </svg>*/}
                {/*    </a>*/}
                {/*</li>*/}
            </ul>
        </footer>
    );
}

export default Footer;
