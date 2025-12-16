// server.js - Server-side only
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MONGODB_URI (masked)=', MONGODB_URI ? `[len:${MONGODB_URI.length}] ${MONGODB_URI.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@)/,'$1***REDACTED***$3')}` : MONGODB_URI);
if (!MONGODB_URI) {
    console.warn('Warning: MONGODB_URI not set in environment. Set it in server/.env');
} else {
    mongoose.connect(MONGODB_URI, { autoIndex: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err.message || err));
}

// API routes
// NOTE: the project contains both a DB-backed router (`server/routes/courses.js`)
// and an in-memory implementation further down in this file. During local
// development we prefer the in-memory endpoints so the frontend always gets
// predictable sample data. Comment out the DB-backed mount to use the
// in-memory `/api/courses` handlers below.
// app.use('/api/courses', require('./routes/courses'));

// ID counters
let courseIdCounter = 2;
let moduleIdCounter = 2;
let topicIdCounter = 2;
let questionIdCounter = 2;

// Sample initial data
let courseData = {
    courses: [
        {
            id: "1",
            title: "Data Communications and Networking",
            description: "Comprehensive course covering data communications fundamentals, network models, signals, transmission, and digital communication.",
            category: "Computer Science",
            icon: "🌐",
            modules: [
                // Chapter 1: Introduction
                {
                    id: "1",
                    title: "Introduction to Data Communications",
                    description: "Fundamental concepts of data communication and networking basics",
                    duration: "2 weeks",
                    order: 1,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Data and Data Communication",
                            completed: false,
                            content: {
                                main: "Data is information presented in an agreed form between creating and using parties. Data communication is the exchange of data between two devices via a transmission medium.",
                                sections: [
                                    {
                                        title: "Fundamental Characteristics",
                                        content: "Delivery, Accuracy, Timeliness, Jitter",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Telecommunication",
                                        content: "Communication at a distance",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Five Components of Data Communication",
                            completed: false,
                            content: {
                                main: "The essential elements that make data communication possible.",
                                sections: [
                                    {
                                        title: "Message",
                                        content: "Information to be communicated",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Sender and Receiver",
                                        content: "Devices that send and receive data",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Transmission Medium",
                                        content: "Physical path for message travel",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Protocol",
                                        content: "Set of rules governing data communication",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Modes of Communication",
                            completed: false,
                            content: {
                                main: "Three types of communication based on data flow direction.",
                                sections: [
                                    {
                                        title: "Simplex",
                                        content: "Unidirectional (e.g., one-way street)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Half-duplex",
                                        content: "Both transmit and receive possible, but not simultaneously (e.g., walkie-talkie)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Full-duplex",
                                        content: "Transmit and receive simultaneously (e.g., telephone network)",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Networks and Connections",
                            completed: false,
                            content: {
                                main: "A network is a set of devices connected by communication links. Connections can be point-to-point or multipoint.",
                                sections: [
                                    {
                                        title: "Node",
                                        content: "Device capable of sending/receiving data",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Point-to-point",
                                        content: "Dedicated link between two devices",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Multipoint",
                                        content: "Multiple devices share a single link",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Network Topologies",
                            completed: false,
                            content: {
                                main: "Different physical layouts of networks.",
                                sections: [
                                    {
                                        title: "Mesh Topology",
                                        content: "Dedicated links to every node",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Star Topology",
                                        content: "Central hub connects all nodes",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bus Topology",
                                        content: "Single cable links all nodes",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Ring and Hybrid",
                                        content: "Nodes connected in circular path or combination of topologies",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "6",
                            title: "Categories of Networks",
                            completed: false,
                            content: {
                                main: "Networks classified by geographical coverage.",
                                sections: [
                                    {
                                        title: "LAN",
                                        content: "Local Area Network (office, campus)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "MAN",
                                        content: "Metropolitan Area Network (city-wide)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "WAN",
                                        content: "Wide Area Network (country, continent)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Internetwork",
                                        content: "Connection of multiple networks",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "7",
                            title: "The Internet and Protocols",
                            completed: false,
                            content: {
                                main: "The Internet is a global network based on TCP/IP protocols.",
                                sections: [
                                    {
                                        title: "History",
                                        content: "ARPANET, TCP/IP by Cerf & Kahn",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Protocols",
                                        content: "Rules for data communication (Syntax, Semantics, Timing)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Standards",
                                        content: "De jure and de facto standards",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Organizations",
                                        content: "ISO, ITU-T, IEEE, IETF, etc.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Chapter 1 Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "What is data communication?",
                                options: [
                                    "Storing data in a database",
                                    "Exchange of data between two devices",
                                    "Processing data locally",
                                    "Displaying data on a screen"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "2",
                                question: "Which topology uses a central hub?",
                                options: [
                                    "Mesh",
                                    "Star",
                                    "Bus",
                                    "Ring"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "3",
                                question: "Which mode allows simultaneous two-way communication?",
                                options: [
                                    "Simplex",
                                    "Half-duplex",
                                    "Full-duplex",
                                    "None of the above"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "4",
                                question: "What does LAN stand for?",
                                options: [
                                    "Long Area Network",
                                    "Local Access Network",
                                    "Local Area Network",
                                    "Large Area Network"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "5",
                                question: "Which organization develops Internet standards?",
                                options: [
                                    "ISO",
                                    "IEEE",
                                    "IETF",
                                    "ANSI"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    createdAt: "2025-01-01T00:00:00.000Z"
                },
                // Chapter 2: Network Models
                {
                    id: "2",
                    title: "Network Models: OSI and TCP/IP",
                    description: "Layered network models including OSI 7-layer model and TCP/IP suite",
                    duration: "3 weeks",
                    order: 2,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Introduction to Layered Models",
                            completed: false,
                            content: {
                                main: "Network models use layering to simplify complex communication tasks. The OSI model is a 7-layer conceptual framework developed by ISO.",
                                sections: [
                                    {
                                        title: "Layer Interaction",
                                        content: "Layers interact through interfaces",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Encapsulation",
                                        content: "Data is encapsulated with headers/trailers at each layer",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Model Comparison",
                                        content: "OSI model vs. TCP/IP model",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Physical Layer (Layer 1)",
                            completed: false,
                            content: {
                                main: "Responsible for transmitting individual bits between nodes.",
                                sections: [
                                    {
                                        title: "Specifications",
                                        content: "Mechanical/electrical specifications",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bit Representation",
                                        content: "Bit representation and synchronization",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Transmission Modes",
                                        content: "Simplex, half-duplex, full-duplex",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Data Link Layer (Layer 2)",
                            completed: false,
                            content: {
                                main: "Responsible for hop-to-hop frame delivery and error-free transmission.",
                                sections: [
                                    {
                                        title: "Framing",
                                        content: "Dividing data into frames",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Physical Addressing",
                                        content: "MAC addresses",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Control Mechanisms",
                                        content: "Flow control, error control, access control",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Network Layer (Layer 3)",
                            completed: false,
                            content: {
                                main: "Responsible for source-to-destination packet delivery across networks.",
                                sections: [
                                    {
                                        title: "Logical Addressing",
                                        content: "IP addresses",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Routing",
                                        content: "Path determination and routing",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Internetwork Communication",
                                        content: "Handles communication across different networks",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Transport Layer (Layer 4)",
                            completed: false,
                            content: {
                                main: "Responsible for process-to-process message delivery.",
                                sections: [
                                    {
                                        title: "Service-point Addressing",
                                        content: "Port numbers",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Segmentation",
                                        content: "Segmentation and reassembly",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Connection Control",
                                        content: "TCP/UDP protocols",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "End-to-end Control",
                                        content: "Flow and error control",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "6",
                            title: "Session, Presentation, and Application Layers (Layers 5-7)",
                            completed: false,
                            content: {
                                main: "Upper layers handling user interaction and data representation.",
                                sections: [
                                    {
                                        title: "Session Layer",
                                        content: "Dialog control and synchronization",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Presentation Layer",
                                        content: "Translation, compression, encryption",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Application Layer",
                                        content: "User services (email, FTP, HTTP, etc.)",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "7",
                            title: "TCP/IP Protocol Suite",
                            completed: false,
                            content: {
                                main: "The practical 4-layer model used on the Internet.",
                                sections: [
                                    {
                                        title: "Network Interface Layer",
                                        content: "Physical + Data Link layers",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Internet Layer",
                                        content: "IP, ARP, ICMP, IGMP",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Transport Layer",
                                        content: "TCP, UDP, SCTP",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Application Layer",
                                        content: "Combines OSI layers 5-7",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "8",
                            title: "Addressing in Networks",
                            completed: false,
                            content: {
                                main: "Four levels of addresses used in TCP/IP networks.",
                                sections: [
                                    {
                                        title: "Physical Address",
                                        content: "MAC address (e.g., 07:01:02:01:2C:4B)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Logical Address",
                                        content: "IP address (e.g., 192.168.1.1)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Port Address",
                                        content: "Port number (e.g., 80 for HTTP)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Specific Address",
                                        content: "User-friendly (e.g., email, URL)",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Network Models Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "Which OSI layer is responsible for moving frames between adjacent nodes?",
                                options: [
                                    "Physical Layer",
                                    "Data Link Layer",
                                    "Network Layer",
                                    "Transport Layer"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "2",
                                question: "What is the main function of the Network Layer?",
                                options: [
                                    "Bit transmission",
                                    "Frame delivery between hops",
                                    "Packet delivery from source to destination",
                                    "Process-to-process communication"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "3",
                                question: "Which TCP/IP layer combines the OSI session, presentation, and application layers?",
                                options: [
                                    "Network Interface Layer",
                                    "Internet Layer",
                                    "Transport Layer",
                                    "Application Layer"
                                ],
                                correctAnswer: 3
                            },
                            {
                                id: "4",
                                question: "A MAC address like 07:01:02:01:2C:4B is an example of what type of address?",
                                options: [
                                    "Logical Address",
                                    "Physical Address",
                                    "Port Address",
                                    "Specific Address"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "5",
                                question: "Which layer handles encryption and compression of data?",
                                options: [
                                    "Session Layer",
                                    "Presentation Layer",
                                    "Application Layer",
                                    "Transport Layer"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    createdAt: "2025-01-08T00:00:00.000Z"
                },
                // Chapter 3: Data and Signals
                {
                    id: "3",
                    title: "Data and Signals",
                    description: "Analog vs digital signals, periodic signals, frequency, amplitude, phase, bandwidth",
                    duration: "2 weeks",
                    order: 3,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Analog vs. Digital Data and Signals",
                            completed: false,
                            content: {
                                main: "Data must be transformed into electromagnetic signals for transmission. Data and signals can be analog or digital.",
                                sections: [
                                    {
                                        title: "Analog Data",
                                        content: "Continuous values (e.g., sound, temperature)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Digital Data",
                                        content: "Discrete values (e.g., binary, integers)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Analog Signal",
                                        content: "Infinite values in a range",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Digital Signal",
                                        content: "Limited number of values (e.g., 0 and 1)",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Periodic and Non-periodic Signals",
                            completed: false,
                            content: {
                                main: "Periodic signals repeat over time; non-periodic signals do not.",
                                sections: [
                                    {
                                        title: "Periodic Signal",
                                        content: "Completes pattern in fixed time frame",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Non-periodic Signal",
                                        content: "Variable timing",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Data Communication Usage",
                                        content: "Periodic analog & non-periodic digital signals are common",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Amplitude, Period, and Frequency",
                            completed: false,
                            content: {
                                main: "Basic characteristics of a signal: amplitude, period, frequency.",
                                sections: [
                                    {
                                        title: "Amplitude (A)",
                                        content: "Signal intensity, proportional to energy",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Period (T)",
                                        content: "Time to complete one cycle (seconds)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Frequency (f)",
                                        content: "Cycles per second (Hz)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Relationship",
                                        content: "Frequency = 1 / Period",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Phase and Wavelength",
                            completed: false,
                            content: {
                                main: "Phase describes the position of a wave relative to time zero. Wavelength is the distance a signal travels in one cycle.",
                                sections: [
                                    {
                                        title: "Phase",
                                        content: "Measured in degrees or radians, indicates shift",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Wavelength (λ)",
                                        content: "Related to propagation speed and frequency",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Formula",
                                        content: "Wavelength = Propagation Speed / Frequency",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Composite Signals and Bandwidth",
                            completed: false,
                            content: {
                                main: "Composite signals are made of multiple sine waves. Bandwidth is the range of frequencies they occupy.",
                                sections: [
                                    {
                                        title: "Composite Signal",
                                        content: "Sum of multiple sine waves with different frequencies, phases, amplitudes",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Fourier Analysis",
                                        content: "Breaks any signal into simple sine waves",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bandwidth (B)",
                                        content: "Highest Frequency - Lowest Frequency",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "6",
                            title: "Digital Signals and Transmission",
                            completed: false,
                            content: {
                                main: "Digital signals are discrete and used in computing and communication.",
                                sections: [
                                    {
                                        title: "Bit Interval",
                                        content: "Time to send one bit",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bit Rate",
                                        content: "Bits per second (bps)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Relationship",
                                        content: "Bit Rate = 1 / Bit Interval",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Baseband Transmission",
                                        content: "Sending digital signal directly without conversion",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Data and Signals Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "Which type of data has discrete states and values?",
                                options: [
                                    "Analog Data",
                                    "Digital Data",
                                    "Periodic Data",
                                    "Composite Data"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "2",
                                question: "What is the relationship between frequency (f) and period (T)?",
                                options: [
                                    "f = T",
                                    "f = 1/T",
                                    "f = T^2",
                                    "f = log(T)"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "3",
                                question: "A signal has a bandwidth of 30 Hz and a highest frequency of 80 Hz. What is the lowest frequency?",
                                options: [
                                    "30 Hz",
                                    "50 Hz",
                                    "80 Hz",
                                    "110 Hz"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "4",
                                question: "Which characteristic describes the position of a waveform relative to time zero?",
                                options: [
                                    "Amplitude",
                                    "Frequency",
                                    "Phase",
                                    "Wavelength"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "5",
                                question: "What is Baseband Transmission?",
                                options: [
                                    "Converting digital to analog before sending",
                                    "Sending digital signal directly without conversion",
                                    "Using only low frequencies",
                                    "Transmitting over long distances"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    createdAt: "2025-01-15T00:00:00.000Z"
                },
                // Chapter 4: Transmission Impairment 
                {
                    id: "4",
                    title: "Transmission Impairment",
                    description: "Signal degradation, noise, data rate limits, and performance metrics",
                    duration: "2 weeks",
                    order: 4,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Transmission Impairments",
                            completed: false,
                            content: {
                                main: "Real-world communication channels degrade signals due to imperfections in the medium.",
                                sections: [
                                    {
                                        title: "Attenuation",
                                        content: "Loss of signal strength, measured in decibels (dB). Example: If power halves, loss ≈ -3 dB.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Distortion",
                                        content: "Change in signal shape because different frequency components travel at different speeds.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Noise",
                                        content: "Unwanted signals added (thermal, induced, crosstalk, impulse).",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Signal-to-Noise Ratio (SNR)",
                                        content: "Measures signal quality. High SNR = clearer signal.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Data Rate Limits: Nyquist & Shannon",
                            completed: false,
                            content: {
                                main: "Theoretical maximum data rates depend on bandwidth, signal levels, and noise.",
                                sections: [
                                    {
                                        title: "Noiseless Channel - Nyquist",
                                        content: "Bit Rate = 2 × Bandwidth × log₂(L)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Example: Nyquist",
                                        content: "B = 3000 Hz, L = 2 → 6000 bps",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Noisy Channel - Shannon",
                                        content: "Capacity = B × log₂(1 + SNR)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Example: Shannon",
                                        content: "B = 3000 Hz, SNR = 3162 → ≈34,860 bps",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Performance Metrics",
                            completed: false,
                            content: {
                                main: "Key metrics to evaluate network performance.",
                                sections: [
                                    {
                                        title: "Bandwidth",
                                        content: "In Hz (frequency range) or bps (speed).",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Throughput",
                                        content: "Actual data transfer rate.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Latency",
                                        content: "Total delay for a message to travel.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bandwidth-Delay Product",
                                        content: "Number of bits that can fill the link.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Chapter 4 Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "What is measured in decibels (dB)?",
                                options: [
                                    "Data Rate",
                                    "Attenuation",
                                    "Noise Frequency",
                                    "Latency"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "2",
                                question: "Which formula is used for a noiseless channel?",
                                options: [
                                    "Shannon Capacity",
                                    "Nyquist Bit Rate",
                                    "Bandwidth-Delay Product",
                                    "SNR Calculation"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "3",
                                question: "If bandwidth = 4000 Hz and SNR = 1023, what is the Shannon capacity?",
                                options: [
                                    "8000 bps",
                                    "12,000 bps",
                                    "≈40,000 bps",
                                    "100,000 bps"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    createdAt: "2025-01-22T00:00:00.000Z"
                },
                // Chapter 5: Digital-to-Digital Conversion
                {
                    id: "5",
                    title: "Digital-to-Digital Conversion",
                    description: "Line coding schemes, unipolar, polar, bipolar encoding, and block coding",
                    duration: "3 weeks",
                    order: 5,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Line Coding Schemes",
                            completed: false,
                            content: {
                                main: "Converting digital data to digital signals using voltage levels.",
                                sections: [
                                    {
                                        title: "Unipolar",
                                        content: "One polarity (e.g., +V for 1, 0V for 0). Example: Unipolar NRZ.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Polar",
                                        content: "Two voltage levels (+V and –V). Example: Manchester.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bipolar",
                                        content: "Three levels (+V, 0V, –V). Examples: AMI, Pseudoternary.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Unipolar NRZ Example",
                            completed: false,
                            content: {
                                main: "Encoding binary data using unipolar NRZ.",
                                sections: [
                                    {
                                        title: "Data",
                                        content: "110010",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Encoding",
                                        content: "1 → +5V, 0 → 0V",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Result",
                                        content: "5V, 5V, 0V, 0V, 5V, 0V",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Issues",
                                        content: "DC component, synchronization problems.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "AMI (Alternate Mark Inversion)",
                            completed: false,
                            content: {
                                main: "A bipolar encoding scheme where 1s alternate between +V and –V.",
                                sections: [
                                    {
                                        title: "Encoding Rule",
                                        content: "0 → 0V, 1 → alternates between +V and –V",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Example",
                                        content: "Data: 1001101 → +V, 0, 0, –V, +V, 0, –V",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Advantages",
                                        content: "No DC component, easy error detection, helps synchronization.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Pseudoternary Encoding",
                            completed: false,
                            content: {
                                main: "Inverse of AMI: 1s are 0V, 0s alternate between +V and –V.",
                                sections: [
                                    {
                                        title: "Example",
                                        content: "Data: 1001101 → 0, +V, –V, 0, 0, +V, 0",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Advantages",
                                        content: "No DC component, lower power for long 1s.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Block Coding",
                            completed: false,
                            content: {
                                main: "Replaces m-bit groups with n-bit groups for redundancy and synchronization.",
                                sections: [
                                    {
                                        title: "Examples",
                                        content: "4B/5B, 8B/10B",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Purpose",
                                        content: "Adds extra bits for error detection and clock recovery.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Chapter 5 Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "Which scheme uses three voltage levels?",
                                options: [
                                    "Unipolar",
                                    "Polar",
                                    "Bipolar",
                                    "Manchester"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "2",
                                question: "In AMI encoding, how are binary '1's represented?",
                                options: [
                                    "Always +V",
                                    "Always –V",
                                    "Alternating +V and –V",
                                    "Always 0V"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "3",
                                question: "What is the purpose of block coding?",
                                options: [
                                    "Increase data rate",
                                    "Add redundancy for error detection",
                                    "Reduce bandwidth",
                                    "Convert analog to digital"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    createdAt: "2025-01-29T00:00:00.000Z"
                },
                // Chapter 6: Sampling & Transmission Modes
                {
                    id: "6",
                    title: "Sampling & Transmission Modes",
                    description: "PCM, quantization, parallel vs serial transmission",
                    duration: "2 weeks",
                    order: 6,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Pulse Code Modulation (PCM)",
                            completed: false,
                            content: {
                                main: "A method to convert analog signals to digital using three steps.",
                                sections: [
                                    {
                                        title: "1. Sampling",
                                        content: "Measure amplitude at regular intervals. Nyquist rate = 2 × highest frequency.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "2. Quantization",
                                        content: "Map samples to discrete levels. Example: 16-bit = 65,536 levels.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "3. Encoding",
                                        content: "Convert quantized values to binary.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Sampling Example",
                            completed: false,
                            content: {
                                main: "Example: Audio CD uses 44.1 kHz sampling rate.",
                                sections: [
                                    {
                                        title: "Highest Audible Frequency",
                                        content: "≈ 20 kHz",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Sampling Rate",
                                        content: "> 40 kHz (Nyquist condition satisfied)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Result",
                                        content: "Ensures accurate reconstruction of original audio.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Quantization & Bit Depth",
                            completed: false,
                            content: {
                                main: "Quantization determines digital signal fidelity.",
                                sections: [
                                    {
                                        title: "Bit Depth",
                                        content: "Number of bits per sample",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "16-bit Quantization",
                                        content: "→ 65,536 levels",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Quality Impact",
                                        content: "Higher bit depth = less quantization noise, better quality.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Parallel Transmission",
                            completed: false,
                            content: {
                                main: "Multiple bits sent simultaneously using multiple wires.",
                                sections: [
                                    {
                                        title: "Advantage",
                                        content: "High speed",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Disadvantage",
                                        content: "Expensive, limited to short distances",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "Computer buses, internal connections.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Serial Transmission",
                            completed: false,
                            content: {
                                main: "Bits sent one after another over a single channel.",
                                sections: [
                                    {
                                        title: "Asynchronous",
                                        content: "Uses start/stop bits per byte. Good for low speed.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Synchronous",
                                        content: "Sends data in frames without gaps. Used for high speed.",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Advantage",
                                        content: "Cost-effective for long distances.",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Chapter 6 Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "What is the Nyquist sampling rate for a signal with max frequency 10 kHz?",
                                options: [
                                    "5 kHz",
                                    "10 kHz",
                                    "20 kHz",
                                    "40 kHz"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "2",
                                question: "How many levels are there in 16-bit quantization?",
                                options: [
                                    "256",
                                    "1024",
                                    "65,536",
                                    "1,048,576"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "3",
                                question: "Which transmission mode uses start and stop bits?",
                                options: [
                                    "Parallel",
                                    "Synchronous Serial",
                                    "Asynchronous Serial",
                                    "PCM"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    createdAt: "2025-02-05T00:00:00.000Z"
                },
                // Chapter 7: Digital-to-Analog Conversion
                {
                    id: "7",
                    title: "Digital-to-Analog Conversion",
                    description: "ASK, FSK, PSK, QAM modulation techniques",
                    duration: "3 weeks",
                    order: 7,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Introduction to Digital-to-Analog Modulation",
                            completed: false,
                            content: {
                                main: "Digital-to-analog conversion is the process of modulating digital data onto an analog carrier signal by changing one or more of its characteristics (amplitude, frequency, or phase).",
                                sections: [
                                    {
                                        title: "Four Main Types",
                                        content: "Digital to Digital, Analog to Digital, Digital to Analog, Analog to Analog",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Modulation",
                                        content: "Changing analog signal characteristics based on digital data",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Carrier Signal",
                                        content: "High-frequency signal used for modulation",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Key Concepts: Data Rate vs. Signal Rate",
                            completed: false,
                            content: {
                                main: "Important terms for understanding digital-to-analog conversion rates and efficiency.",
                                sections: [
                                    {
                                        title: "Signal Element",
                                        content: "Represents one or more bits",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Data Rate (Bit Rate)",
                                        content: "Bits per second (bps)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Signal Rate (Baud Rate)",
                                        content: "Signal elements per second (baud)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Formula",
                                        content: "S = N × (1/r) where S = signal rate, N = data rate, r = data elements per signal element",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Amplitude Shift Keying (ASK)",
                            completed: false,
                            content: {
                                main: "ASK varies the amplitude of the carrier signal while keeping frequency and phase constant.",
                                sections: [
                                    {
                                        title: "Characteristics",
                                        content: "Frequency and phase remain constant, amplitude changes",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Vulnerability",
                                        content: "Highly vulnerable to noise interference",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Binary ASK (BASK)",
                                        content: "One bit = voltage present, other bit = no voltage",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bandwidth",
                                        content: "B = (1 + d) × S where d = modulation factor",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Frequency Shift Keying (FSK)",
                            completed: false,
                            content: {
                                main: "FSK varies the frequency of the carrier signal while keeping amplitude and phase constant.",
                                sections: [
                                    {
                                        title: "Characteristics",
                                        content: "Amplitude and phase remain constant, frequency changes",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Noise Immunity",
                                        content: "Better noise immunity compared to ASK",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Disadvantage",
                                        content: "Compatibility issues with carrier devices",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Binary FSK",
                                        content: "Two different frequencies for 0 and 1",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Phase Shift Keying (PSK)",
                            completed: false,
                            content: {
                                main: "PSK varies the phase of the carrier signal while keeping frequency and amplitude constant.",
                                sections: [
                                    {
                                        title: "Characteristics",
                                        content: "Frequency and amplitude remain constant, phase changes",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Binary PSK (BPSK)",
                                        content: "0° = binary 0, 180° = binary 1",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "Widely used in modern communication",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bandwidth",
                                        content: "Same as ASK, B = (1 + d) × S",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "6",
                            title: "Quadrature Amplitude Modulation (QAM)",
                            completed: false,
                            content: {
                                main: "QAM combines both amplitude and phase modulation for higher efficiency.",
                                sections: [
                                    {
                                        title: "Combination",
                                        content: "Combination of ASK and PSK",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Efficiency",
                                        content: "Allows more bits per signal unit by varying both amplitude and phase",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Types",
                                        content: "4-QAM (1 amplitude, 4 phases), 8-QAM (2 amplitudes, 4 phases)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "High-speed data transmission",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Digital-to-Analog Conversion Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "What does ASK stand for in digital-to-analog modulation?",
                                options: [
                                    "Amplitude Signal Keying",
                                    "Analog Shift Keying",
                                    "Amplitude Shift Keying",
                                    "Analog Signal Keying"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "2",
                                question: "Which modulation technique is most vulnerable to noise?",
                                options: [
                                    "FSK",
                                    "PSK",
                                    "ASK",
                                    "QAM"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "3",
                                question: "In BPSK (Binary Phase Shift Keying), what phase shift represents binary 1?",
                                options: [
                                    "0°",
                                    "90°",
                                    "180°",
                                    "270°"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "4",
                                question: "What does QAM combine for higher efficiency?",
                                options: [
                                    "Frequency and Phase",
                                    "Amplitude and Frequency",
                                    "Amplitude and Phase",
                                    "Frequency and Time"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "5",
                                question: "What is the relationship between data rate (N) and signal rate (S)?",
                                options: [
                                    "S = N × r",
                                    "S = N / r",
                                    "S = N × (1/r)",
                                    "S = N + r"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    createdAt: "2025-02-12T00:00:00.000Z"
                },
                // Chapter 8: Analog-to-Analog Conversion
                {
                    id: "8",
                    title: "Analog-to-Analog Conversion",
                    description: "AM, FM, PM modulation techniques and broadcasting applications",
                    duration: "2 weeks",
                    order: 8,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Introduction to Analog-to-Analog Modulation",
                            completed: false,
                            content: {
                                main: "Analog-to-analog conversion involves modulating analog information onto an analog carrier signal for transmission over specific frequency bands.",
                                sections: [
                                    {
                                        title: "Four Main Types",
                                        content: "Digital-Digital, Analog-Digital, Digital-Analog, Analog-Analog",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "When Used",
                                        content: "When medium is passband (high frequency) or low-pass (baseband)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Main Types",
                                        content: "AM, FM, and PM",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Amplitude Modulation (AM)",
                            completed: false,
                            content: {
                                main: "AM varies the amplitude of the carrier signal while keeping phase and frequency constant.",
                                sections: [
                                    {
                                        title: "Characteristics",
                                        content: "Phase and frequency remain constant, amplitude changes",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "AM radio broadcasting",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bandwidth",
                                        content: "Audio: ~5 kHz → AM needs minimum 10 kHz bandwidth",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "FCC Allocation",
                                        content: "530 kHz to 1700 kHz with 10 kHz spacing",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Frequency Modulation (FM)",
                            completed: false,
                            content: {
                                main: "FM varies the frequency of the carrier signal while keeping phase and amplitude constant.",
                                sections: [
                                    {
                                        title: "Characteristics",
                                        content: "Phase and amplitude remain constant, frequency changes",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "FM radio, stereo broadcasting, TV audio",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bandwidth",
                                        content: "Stereo audio: ~15 kHz → FM needs ~150 kHz bandwidth",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "FCC Allocation",
                                        content: "88 MHz to 108 MHz with 200 kHz spacing",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Phase Modulation (PM)",
                            completed: false,
                            content: {
                                main: "PM varies the phase of the carrier signal while keeping amplitude and frequency constant.",
                                sections: [
                                    {
                                        title: "Characteristics",
                                        content: "Amplitude and frequency remain constant, phase changes",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Information Representation",
                                        content: "Instantaneous phase variations",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "Digital music synthesizers (e.g., Yamaha DX7)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Disadvantages",
                                        content: "Complex hardware, phase ambiguity issues",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Comparison: AM vs. FM vs. PM",
                            completed: false,
                            content: {
                                main: "Each analog modulation technique has different characteristics and applications.",
                                sections: [
                                    {
                                        title: "AM",
                                        content: "Simple, longer range, susceptible to noise",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "FM",
                                        content: "Better quality, stereo capable, shorter range",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "PM",
                                        content: "Specialized uses, complex implementation",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Bandwidth Formulas",
                                        content: "AM: 2 × audio bandwidth, FM: 10 × audio bandwidth",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Analog-to-Analog Conversion Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "Which type of modulation varies only the amplitude of the carrier signal?",
                                options: [
                                    "Frequency Modulation (FM)",
                                    "Phase Modulation (PM)",
                                    "Amplitude Modulation (AM)",
                                    "Quadrature Amplitude Modulation (QAM)"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "2",
                                question: "What is the bandwidth formula for AM?",
                                options: [
                                    "BWₜ = BWₘ",
                                    "BWₜ = 2 × BWₘ",
                                    "BWₜ = 10 × BWₘ",
                                    "BWₜ = 5 × BWₘ"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "3",
                                question: "What frequency range is allocated for FM radio broadcasting?",
                                options: [
                                    "530–1700 kHz",
                                    "88–108 MHz",
                                    "300–3000 MHz",
                                    "3–30 kHz"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "4",
                                question: "Why is Phase Modulation (PM) not widely used in radio broadcasting?",
                                options: [
                                    "It requires too much bandwidth",
                                    "It has poor sound quality",
                                    "It requires complex hardware and has phase ambiguity issues",
                                    "It is illegal in most countries"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "5",
                                question: "How much bandwidth does an FM station typically need for stereo audio?",
                                options: [
                                    "10 kHz",
                                    "50 kHz",
                                    "150 kHz",
                                    "1 MHz"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    },
                    createdAt: "2025-02-19T00:00:00.000Z"
                },
                // Chapter 9: Transmission Media
                {
                    id: "9",
                    title: "Transmission Media",
                    description: "Guided and unguided media, cables, fiber optics, wireless transmission",
                    duration: "3 weeks",
                    order: 9,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Introduction to Transmission Media",
                            completed: false,
                            content: {
                                main: "Transmission media are materials or substances that can propagate energy waves for communication, including both physical cables and wireless mediums.",
                                sections: [
                                    {
                                        title: "Bounded/Guided Media",
                                        content: "Finite extent (cables, fibers)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Unbounded/Unguided Media",
                                        content: "Infinite extent (wireless)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Uniform/Homogeneous",
                                        content: "Same properties throughout",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Heterogeneous",
                                        content: "Varying properties at different points",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Twisted-Pair Cable",
                            completed: false,
                            content: {
                                main: "Twisted-pair cable consists of two copper conductors twisted together to cancel electromagnetic interference (EMI).",
                                sections: [
                                    {
                                        title: "UTP",
                                        content: "Unshielded Twisted Pair - Common in Ethernet and telephone systems",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "STP",
                                        content: "Shielded Twisted Pair - Metal shielding for better EMI protection",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Categories",
                                        content: "Cat 3 to Cat 7 (higher numbers = higher bandwidth)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Connector",
                                        content: "RJ45 for Ethernet connections",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Coaxial Cable",
                            completed: false,
                            content: {
                                main: "Coaxial cable has an inner conductor surrounded by insulation and an outer conducting shield, used for higher frequency transmission.",
                                sections: [
                                    {
                                        title: "Structure",
                                        content: "Inner conductor + insulation + outer shield + jacket",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Types",
                                        content: "RG-59 (TV), RG-58 (Ethernet), RG-11 (long distance)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Impedance",
                                        content: "50Ω for data, 75Ω for video",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "Cable TV, broadband Internet, video surveillance",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Fiber Optic Cable",
                            completed: false,
                            content: {
                                main: "Fiber optic cables transmit data as light pulses through glass or plastic fibers, offering high bandwidth and low attenuation.",
                                sections: [
                                    {
                                        title: "Light Speed",
                                        content: "300,000 km/s in vacuum, slower in denser media",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Propagation Modes",
                                        content: "Multimode (multiple paths) and Single-mode (single path)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Connectors",
                                        content: "SC, ST, MT-RJ",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Advantages",
                                        content: "High bandwidth, EMI immunity, lightweight",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Wireless Transmission",
                            completed: false,
                            content: {
                                main: "Wireless media use electromagnetic waves to transmit data without physical connections.",
                                sections: [
                                    {
                                        title: "Propagation Methods",
                                        content: "Ground, Sky, Line-of-sight",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Radio Waves",
                                        content: "3 kHz–300 GHz, omnidirectional, for broadcasting",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Microwaves",
                                        content: "300 MHz–300 GHz, directional, for cellular/satellite",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "Radio/TV, wireless LAN, cellular networks",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Transmission Media Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "What is the main advantage of twisting wires in twisted-pair cable?",
                                options: [
                                    "Increase bandwidth",
                                    "Cancel electromagnetic interference",
                                    "Reduce cost",
                                    "Improve flexibility"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "2",
                                question: "Which connector is commonly used with coaxial cable?",
                                options: [
                                    "RJ45",
                                    "BNC",
                                    "SC",
                                    "USB"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "3",
                                question: "What propagation mode in fiber optic cable uses a single light path?",
                                options: [
                                    "Multimode Step-index",
                                    "Multimode Graded-index",
                                    "Single-mode",
                                    "Double-mode"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "4",
                                question: "Which wireless propagation method reflects signals off the ionosphere?",
                                options: [
                                    "Ground propagation",
                                    "Sky propagation",
                                    "Line-of-sight propagation",
                                    "Direct propagation"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "5",
                                question: "What is the typical impedance of coaxial cable used for video signals?",
                                options: [
                                    "50Ω",
                                    "75Ω",
                                    "100Ω",
                                    "125Ω"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    createdAt: "2025-02-26T00:00:00.000Z"
                },
                // Chapter 10: Multiplexing Techniques
                {
                    id: "10",
                    title: "Multiplexing Techniques",
                    description: "FDM, WDM, TDM, spread spectrum, digital hierarchy",
                    duration: "3 weeks",
                    order: 10,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Introduction to Multiplexing",
                            completed: false,
                            content: {
                                main: "Multiplexing combines multiple signals into one over a shared medium to efficiently utilize bandwidth.",
                                sections: [
                                    {
                                        title: "Purpose",
                                        content: "Share expensive resources, increase efficiency",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Multiplexer (MUX)",
                                        content: "Combines signals",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Demultiplexer (DEMUX)",
                                        content: "Separates signals",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "Telecommunications, computer networks",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Frequency Division Multiplexing (FDM)",
                            completed: false,
                            content: {
                                main: "FDM divides the bandwidth into multiple frequency channels, each carrying a separate signal.",
                                sections: [
                                    {
                                        title: "Technique",
                                        content: "Analog technique",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Guard Bands",
                                        content: "Channels separated by guard bands",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "AM/FM radio, TV broadcasting",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Example",
                                        content: "Combining three 4 kHz voice channels into 12 kHz bandwidth",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Wavelength Division Multiplexing (WDM)",
                            completed: false,
                            content: {
                                main: "WDM is the optical equivalent of FDM, combining multiple light signals of different wavelengths.",
                                sections: [
                                    {
                                        title: "Implementation",
                                        content: "Uses prisms to combine/split light",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "DWDM",
                                        content: "Dense WDM - Many closely spaced wavelengths",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "SONET, fiber optic backbone networks",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Advantages",
                                        content: "High capacity, long distance",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Time Division Multiplexing (TDM)",
                            completed: false,
                            content: {
                                main: "TDM divides time into slots, with each signal allocated specific time intervals.",
                                sections: [
                                    {
                                        title: "Technique",
                                        content: "Digital technique",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Types",
                                        content: "Synchronous TDM (fixed slots) and Statistical TDM (dynamic)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "T-1 Line",
                                        content: "1.544 Mbps (24 channels × 64 kbps + overhead)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Frame Synchronization",
                                        content: "Sync bits for timing",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Spread Spectrum Techniques",
                            completed: false,
                            content: {
                                main: "Spread spectrum spreads signals over a wider bandwidth for security and interference resistance.",
                                sections: [
                                    {
                                        title: "FHSS",
                                        content: "Frequency Hopping Spread Spectrum - Signal hops between frequencies",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "DSSS",
                                        content: "Direct Sequence Spread Spectrum - Each bit replaced with chip code",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "Wireless LAN (Wi-Fi), Bluetooth, military comms",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Advantages",
                                        content: "Security, interference resistance",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Multiplexing Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "What technique divides bandwidth into frequency channels?",
                                options: [
                                    "TDM",
                                    "FDM",
                                    "WDM",
                                    "CDM"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "2",
                                question: "What is the purpose of guard bands in FDM?",
                                options: [
                                    "Increase data rate",
                                    "Prevent channel overlapping",
                                    "Provide synchronization",
                                    "Reduce noise"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "3",
                                question: "What is the data rate of a T1 line?",
                                options: [
                                    "64 kbps",
                                    "1.544 Mbps",
                                    "2.048 Mbps",
                                    "44.736 Mbps"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "4",
                                question: "Which spread spectrum technique hops between frequencies?",
                                options: [
                                    "DSSS",
                                    "FHSS",
                                    "TDMA",
                                    "CDMA"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "5",
                                question: "What does WDM stand for?",
                                options: [
                                    "Wavelength Division Multiplexing",
                                    "Wave Division Modulation",
                                    "Wireless Data Multiplexing",
                                    "Wideband Digital Multiplexing"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    },
                    createdAt: "2025-03-05T00:00:00.000Z"
                },
                // Chapter 11: High-Speed Digital Access
                {
                    id: "11",
                    title: "High-Speed Digital Access",
                    description: "DSL, cable modem, SONET, telephone modem technologies",
                    duration: "2 weeks",
                    order: 11,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "DSL Technology",
                            completed: false,
                            content: {
                                main: "DSL (Digital Subscriber Line) uses existing telephone lines to provide high-speed Internet access.",
                                sections: [
                                    {
                                        title: "ADSL",
                                        content: "Asymmetric - 1 Mbps upstream, 8 Mbps downstream",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "SDSL",
                                        content: "Symmetric - Equal speeds in both directions",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "HDSL",
                                        content: "High-bit-rate - Alternative to T-1 lines",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "VDSL",
                                        content: "Very-high-bit-rate - Short distance, high speed",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Cable Modem Technology",
                            completed: false,
                            content: {
                                main: "Cable modems provide Internet access over hybrid fiber-coaxial (HFC) networks originally designed for cable TV.",
                                sections: [
                                    {
                                        title: "HFC Network",
                                        content: "Combination of fiber and coaxial cable",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "DOCSIS Standard",
                                        content: "Data Over Cable Service Interface Specification",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "CMTS",
                                        content: "Cable Modem Termination System at provider end",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Communication",
                                        content: "Bidirectional - Upstream and downstream",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "SONET/SDH",
                            completed: false,
                            content: {
                                main: "SONET (Synchronous Optical Network) and SDH (Synchronous Digital Hierarchy) are standards for high-speed optical transmission.",
                                sections: [
                                    {
                                        title: "Devices",
                                        content: "STS multiplexer, regenerator, add/drop multiplexer",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Hierarchy",
                                        content: "OC-1 (51.84 Mbps) to OC-768 (40 Gbps)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "Telephone networks, video conferencing, backbone",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Advantages",
                                        content: "Standardization, reliability, high capacity",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Telephone Modems",
                            completed: false,
                            content: {
                                main: "Traditional modems convert digital data to analog signals for transmission over telephone lines.",
                                sections: [
                                    {
                                        title: "Definition",
                                        content: "Modem = Modulator/Demodulator",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Maximum Speed",
                                        content: "56 kbps (V.90/V.92 standard)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Connection Type",
                                        content: "Dial-up - Temporary connection",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Status",
                                        content: "Gradually replaced by broadband technologies",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Digital Access Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "What does ADSL stand for?",
                                options: [
                                    "Advanced Digital Subscriber Line",
                                    "Asymmetric Digital Subscriber Line",
                                    "Analog Digital Service Line",
                                    "Asymmetric Data Service Line"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "2",
                                question: "Which standard governs cable modem communication?",
                                options: [
                                    "IEEE 802.11",
                                    "DOCSIS",
                                    "SONET",
                                    "ADSL2+"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "3",
                                question: "What is the maximum speed of traditional telephone modems?",
                                options: [
                                    "28.8 kbps",
                                    "33.6 kbps",
                                    "56 kbps",
                                    "128 kbps"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "4",
                                question: "Which DSL type offers equal upload and download speeds?",
                                options: [
                                    "ADSL",
                                    "SDSL",
                                    "VDSL",
                                    "HDSL"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "5",
                                question: "What does HFC stand for in cable networks?",
                                options: [
                                    "High Frequency Cable",
                                    "Hybrid Fiber Coaxial",
                                    "High-speed Fiber Connection",
                                    "Home Fiber Cable"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    },
                    createdAt: "2025-03-12T00:00:00.000Z"
                },
                // Chapter 12: Error Detection and Correction
                {
                    id: "12",
                    title: "Error Detection and Correction",
                    description: "Parity, checksum, CRC, Hamming codes, error types",
                    duration: "2 weeks",
                    order: 12,
                    isPublished: true,
                    topics: [
                        {
                            id: "1",
                            title: "Types of Errors",
                            completed: false,
                            content: {
                                main: "Errors occur when data bits change during transmission due to noise, interference, or other factors.",
                                sections: [
                                    {
                                        title: "Single-bit Error",
                                        content: "One bit changes (0→1 or 1→0)",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Burst Error",
                                        content: "Two or more consecutive bits change",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Causes",
                                        content: "Electromagnetic interference, thermal noise, crosstalk",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Impact",
                                        content: "Corrupted data, retransmission, reduced throughput",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "2",
                            title: "Parity Check",
                            completed: false,
                            content: {
                                main: "Parity checking adds an extra bit to make the total number of 1s either even or odd.",
                                sections: [
                                    {
                                        title: "Even Parity",
                                        content: "Total 1s (including parity) is even",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Odd Parity",
                                        content: "Total 1s (including parity) is odd",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Simple Parity",
                                        content: "Single parity bit per data unit",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "2D Parity",
                                        content: "Parity bits for rows and columns",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "3",
                            title: "Checksum",
                            completed: false,
                            content: {
                                main: "Checksum divides data into fixed-size segments, sums them, and sends the complement as error detection.",
                                sections: [
                                    {
                                        title: "Process",
                                        content: "Divide → Sum → Complement → Send",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Sender",
                                        content: "Creates checksum from data",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Receiver",
                                        content: "Recalculates checksum, compares to received",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Validation",
                                        content: "If checksum = 0: Data accepted, If ≠ 0: Data rejected",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "4",
                            title: "Cyclic Redundancy Check (CRC)",
                            completed: false,
                            content: {
                                main: "CRC uses polynomial division to generate a remainder that's appended to data for error detection.",
                                sections: [
                                    {
                                        title: "Basis",
                                        content: "Binary polynomial division",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Generator Polynomial",
                                        content: "Known divisor",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "CRC Code",
                                        content: "Remainder becomes CRC code",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Applications",
                                        content: "Ethernet, USB, storage devices",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        },
                        {
                            id: "5",
                            title: "Error Correction Methods",
                            completed: false,
                            content: {
                                main: "Error correction techniques can fix errors without retransmission or request retransmission.",
                                sections: [
                                    {
                                        title: "Retransmission (ARQ)",
                                        content: "Discard corrupted data, request retransmission",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Forward Error Correction (FEC)",
                                        content: "Add redundancy to correct errors at receiver",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Hamming Code",
                                        content: "Example of FEC, can correct single-bit errors",
                                        video: "",
                                        image: ""
                                    },
                                    {
                                        title: "Trade-off",
                                        content: "FEC adds overhead, ARQ adds delay",
                                        video: "",
                                        image: ""
                                    }
                                ]
                            }
                        }
                    ],
                    test: {
                        title: "Error Detection & Correction Assessment",
                        questions: [
                            {
                                id: "1",
                                question: "What type of error affects two or more consecutive bits?",
                                options: [
                                    "Single-bit error",
                                    "Burst error",
                                    "Parity error",
                                    "Checksum error"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "2",
                                question: "In even parity, if data has 5 ones, what should the parity bit be?",
                                options: [
                                    "0",
                                    "1",
                                    "Depends on data length",
                                    "Can't determine"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "3",
                                question: "What does the receiver do with checksum calculation?",
                                options: [
                                    "Discard it",
                                    "Compare with sender's checksum",
                                    "Add it to data",
                                    "Use it for encryption"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "4",
                                question: "Which error correction method requests retransmission?",
                                options: [
                                    "FEC",
                                    "Hamming Code",
                                    "ARQ",
                                    "CRC"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "5",
                                question: "What can Hamming codes correct?",
                                options: [
                                    "Single-bit errors only",
                                    "Burst errors only",
                                    "Both single and burst errors",
                                    "No errors, only detect"
                                ],
                                correctAnswer: 0
                            }
                        ]
                    },
                    createdAt: "2025-03-19T00:00:00.000Z"
                }
            ]
        }
    ]
};
// Utility functions
const findCourseById = (courseId) => {
    return courseData.courses.find(course => course.id === courseId.toString());
};

const findModuleById = (courseId, moduleId) => {
    const course = findCourseById(courseId);
    return course ? course.modules.find(module => module.id === moduleId.toString()) : null;
};

const findTopicById = (courseId, moduleId, topicId) => {
    const module = findModuleById(courseId, moduleId);
    return module ? module.topics.find(topic => topic.id === topicId.toString()) : null;
};

// ==================== COURSE ROUTES ====================
app.get('/api/courses', (req, res) => {
    try {
        res.json({
            success: true,
            data: courseData.courses,
            count: courseData.courses.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
});

app.get('/api/courses/:courseId', (req, res) => {
    try {
        const { courseId } = req.params;
        const course = findCourseById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            data: course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching course',
            error: error.message
        });
    }
});

app.post('/api/courses', (req, res) => {
    try {
        const { title, description, category, icon } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }

        const newCourse = {
            id: (courseIdCounter++).toString(),
            title,
            description,
            category: category || 'Science',
            icon: icon || '📚',
            modules: []
        };

        courseData.courses.push(newCourse);

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: newCourse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating course',
            error: error.message
        });
    }
});

app.put('/api/courses/:courseId', (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, category, icon } = req.body;

        const courseIndex = courseData.courses.findIndex(course => course.id === courseId.toString());

        if (courseIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        if (title) courseData.courses[courseIndex].title = title;
        if (description) courseData.courses[courseIndex].description = description;
        if (category) courseData.courses[courseIndex].category = category;
        if (icon) courseData.courses[courseIndex].icon = icon;

        res.json({
            success: true,
            message: 'Course updated successfully',
            data: courseData.courses[courseIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating course',
            error: error.message
        });
    }
});

app.delete('/api/courses/:courseId', (req, res) => {
    try {
        const { courseId } = req.params;

        const courseIndex = courseData.courses.findIndex(course => course.id === courseId.toString());

        if (courseIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        courseData.courses.splice(courseIndex, 1);

        res.json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting course',
            error: error.message
        });
    }
});

// ==================== MODULE ROUTES ====================
app.get('/api/courses/:courseId/modules', (req, res) => {
    try {
        const { courseId } = req.params;
        const course = findCourseById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.json({
            success: true,
            data: course.modules,
            count: course.modules.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching modules',
            error: error.message
        });
    }
});

app.get('/api/courses/:courseId/modules/:moduleId', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const module = findModuleById(courseId, moduleId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        res.json({
            success: true,
            data: module
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching module',
            error: error.message
        });
    }
});

app.post('/api/courses/:courseId/modules', (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, duration, order, isPublished } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Module title is required'
            });
        }

        const course = findCourseById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const newModule = {
            id: (moduleIdCounter++).toString(),
            title,
            description: description || '',
            duration: duration || '',
            order: order || (course.modules.length + 1),
            isPublished: isPublished || false,
            topics: [],
            test: { title: `${title} Assessment`, questions: [] },
            createdAt: new Date().toISOString()
        };

        course.modules.push(newModule);

        res.status(201).json({
            success: true,
            message: 'Module created successfully',
            data: newModule
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating module',
            error: error.message
        });
    }
});

app.put('/api/courses/:courseId/modules/:moduleId', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const { title, description, duration, order, isPublished } = req.body;

        const course = findCourseById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const moduleIndex = course.modules.findIndex(module => module.id === moduleId.toString());
        if (moduleIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (title !== undefined) course.modules[moduleIndex].title = title;
        if (description !== undefined) course.modules[moduleIndex].description = description;
        if (duration !== undefined) course.modules[moduleIndex].duration = duration;
        if (order !== undefined) course.modules[moduleIndex].order = order;
        if (isPublished !== undefined) course.modules[moduleIndex].isPublished = isPublished;

        res.json({
            success: true,
            message: 'Module updated successfully',
            data: course.modules[moduleIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating module',
            error: error.message
        });
    }
});

app.delete('/api/courses/:courseId/modules/:moduleId', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;

        const course = findCourseById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        const moduleIndex = course.modules.findIndex(module => module.id === moduleId.toString());
        if (moduleIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        course.modules.splice(moduleIndex, 1);

        res.json({
            success: true,
            message: 'Module deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting module',
            error: error.message
        });
    }
});

// ==================== TOPIC ROUTES ====================
app.get('/api/courses/:courseId/modules/:moduleId/topics', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const module = findModuleById(courseId, moduleId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        res.json({
            success: true,
            data: module.topics,
            count: module.topics.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching topics',
            error: error.message
        });
    }
});

app.get('/api/courses/:courseId/modules/:moduleId/topics/:topicId', (req, res) => {
    try {
        const { courseId, moduleId, topicId } = req.params;
        const topic = findTopicById(courseId, moduleId, topicId);

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        res.json({
            success: true,
            data: topic
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching topic',
            error: error.message
        });
    }
});

app.post('/api/courses/:courseId/modules/:moduleId/topics', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const { title, content, completed = false } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Topic title is required'
            });
        }

        const module = findModuleById(courseId, moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        const newTopic = {
            id: (topicIdCounter++).toString(),
            title,
            completed,
            content: content || {
                main: "",
                sections: []
            }
        };

        module.topics.push(newTopic);

        res.status(201).json({
            success: true,
            message: 'Topic created successfully',
            data: newTopic
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating topic',
            error: error.message
        });
    }
});

app.put('/api/courses/:courseId/modules/:moduleId/topics/:topicId/complete', (req, res) => {
    try {
        const { courseId, moduleId, topicId } = req.params;
        const { completed } = req.body;

        const topic = findTopicById(courseId, moduleId, topicId);
        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        topic.completed = completed;

        res.json({
            success: true,
            message: `Topic marked as ${completed ? 'completed' : 'incomplete'}`,
            data: topic
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating topic',
            error: error.message
        });
    }
});

// ==================== TEST ROUTES ====================
app.get('/api/courses/:courseId/modules/:moduleId/test', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const module = findModuleById(courseId, moduleId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        res.json({
            success: true,
            data: module.test || { title: `${module.title} Assessment`, questions: [] }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching test',
            error: error.message
        });
    }
});

app.post('/api/courses/:courseId/modules/:moduleId/test', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const { title, questions } = req.body;

        const module = findModuleById(courseId, moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        module.test = {
            title: title || `${module.title} Assessment`,
            questions: questions || []
        };

        res.json({
            success: true,
            message: 'Test saved successfully',
            data: module.test
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error saving test',
            error: error.message
        });
    }
});

app.delete('/api/courses/:courseId/modules/:moduleId/test', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;

        const module = findModuleById(courseId, moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        module.test = { title: `${module.title} Assessment`, questions: [] };

        res.json({
            success: true,
            message: 'Test reset successfully',
            data: module.test
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error resetting test',
            error: error.message
        });
    }
});

app.get('/api/courses/:courseId/modules/:moduleId/test/questions', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const module = findModuleById(courseId, moduleId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (!module.test) {
            module.test = { title: `${module.title} Assessment`, questions: [] };
        }

        res.json({
            success: true,
            data: module.test.questions,
            count: module.test.questions.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching questions',
            error: error.message
        });
    }
});

app.post('/api/courses/:courseId/modules/:moduleId/test/questions', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const { question, options, correctAnswer } = req.body;

        if (!question || !options || !Array.isArray(options) || options.length !== 4 || correctAnswer === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Question, 4 options, and correctAnswer are required'
            });
        }

        const module = findModuleById(courseId, moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (!module.test) {
            module.test = {
                title: `${module.title} Assessment`,
                questions: []
            };
        }

        const newQuestion = {
            id: (questionIdCounter++).toString(),
            question,
            options,
            correctAnswer: parseInt(correctAnswer)
        };

        module.test.questions.push(newQuestion);

        res.status(201).json({
            success: true,
            message: 'Question added successfully',
            data: newQuestion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding question',
            error: error.message
        });
    }
});

app.get('/api/courses/:courseId/modules/:moduleId/test/questions/:questionId', (req, res) => {
    try {
        const { courseId, moduleId, questionId } = req.params;
        const module = findModuleById(courseId, moduleId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (!module.test || !module.test.questions) {
            return res.status(404).json({
                success: false,
                message: 'No questions found'
            });
        }

        const question = module.test.questions.find(q => q.id === questionId.toString());
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        res.json({
            success: true,
            data: question
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching question',
            error: error.message
        });
    }
});

app.put('/api/courses/:courseId/modules/:moduleId/test/questions/:questionId', (req, res) => {
    try {
        const { courseId, moduleId, questionId } = req.params;
        const { question, options, correctAnswer } = req.body;

        const module = findModuleById(courseId, moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (!module.test || !module.test.questions) {
            return res.status(404).json({
                success: false,
                message: 'No questions found'
            });
        }

        const questionIndex = module.test.questions.findIndex(q => q.id === questionId.toString());
        if (questionIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        if (question !== undefined) module.test.questions[questionIndex].question = question;
        if (options !== undefined) module.test.questions[questionIndex].options = options;
        if (correctAnswer !== undefined) module.test.questions[questionIndex].correctAnswer = parseInt(correctAnswer);

        res.json({
            success: true,
            message: 'Question updated successfully',
            data: module.test.questions[questionIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating question',
            error: error.message
        });
    }
});

app.delete('/api/courses/:courseId/modules/:moduleId/test/questions/:questionId', (req, res) => {
    try {
        const { courseId, moduleId, questionId } = req.params;

        const module = findModuleById(courseId, moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (!module.test || !module.test.questions) {
            return res.status(404).json({
                success: false,
                message: 'No questions found'
            });
        }

        const questionIndex = module.test.questions.findIndex(q => q.id === questionId.toString());
        if (questionIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        module.test.questions.splice(questionIndex, 1);

        res.json({
            success: true,
            message: 'Question deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting question',
            error: error.message
        });
    }
});

app.post('/api/courses/:courseId/modules/:moduleId/test/submit', (req, res) => {
    try {
        const { courseId, moduleId } = req.params;
        const { answers } = req.body;

        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({
                success: false,
                message: 'Answers array is required'
            });
        }

        const module = findModuleById(courseId, moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        if (!module.test || !module.test.questions) {
            return res.status(404).json({
                success: false,
                message: 'No test found'
            });
        }

        let score = 0;
        const totalQuestions = module.test.questions.length;

        module.test.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                score++;
            }
        });

        const percentage = (score / totalQuestions) * 100;

        res.json({
            success: true,
            data: {
                score,
                totalQuestions,
                percentage: percentage.toFixed(2),
                passed: percentage >= 70
            },
            message: 'Test submitted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error submitting test',
            error: error.message
        });
    }
});

// ==================== SEARCH ROUTES ====================
app.get('/api/search', (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const searchTerm = q.toLowerCase();
        const results = {
            courses: [],
            modules: [],
            topics: []
        };

        courseData.courses.forEach(course => {
            if (course.title.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm)) {
                results.courses.push({
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    type: 'course'
                });
            }

            course.modules.forEach(module => {
                if (module.title.toLowerCase().includes(searchTerm)) {
                    results.modules.push({
                        id: module.id,
                        title: module.title,
                        courseId: course.id,
                        courseTitle: course.title,
                        type: 'module'
                    });
                }

                module.topics.forEach(topic => {
                    if (topic.title.toLowerCase().includes(searchTerm) ||
                        (topic.content && topic.content.main.toLowerCase().includes(searchTerm))) {
                        results.topics.push({
                            id: topic.id,
                            title: topic.title,
                            courseId: course.id,
                            courseTitle: course.title,
                            moduleId: module.id,
                            moduleTitle: module.title,
                            type: 'topic'
                        });
                    }
                });
            });
        });

        res.json({
            success: true,
            data: results,
            totalResults: results.courses.length + results.modules.length + results.topics.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error performing search',
            error: error.message
        });
    }
});

// ==================== HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Biology Course API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// ==================== ERROR HANDLING ====================
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
    });
});

// Start server
// Add this before your routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.listen(PORT, () => {
    console.log(`🚀 Biology Course API running on port ${PORT}`);
    console.log(`🎓 Courses Endpoint: http://localhost:${PORT}/api/courses`);
    console.log(`📝 Test Endpoint: http://localhost:${PORT}/api/courses/1/modules/1/test`);
});