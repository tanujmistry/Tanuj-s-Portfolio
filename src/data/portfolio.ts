export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  positioning: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github?: string;
  hardwareGalleryUrl?: string;
  education: {
    degree: string;
    major: string;
    institution: string;
    cgpa: string;
    duration: string;
    status: string;
  };
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  type: 'Internship' | 'Leadership' | 'Research';
  description: string;
  achievements: string[];
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  category: 'FPGA & Hardware' | 'Embedded & IoT' | 'AI & Machine Learning' | 'Signal Processing';
  isFlagship?: boolean;
  metrics?: string;
  highlights: string[];
  tools: string[];
  githubUrl?: string;
  demoUrl?: string;
  galleryUrl?: string;
  image?: string;
  schematicImage?: string;
  hardwareTags?: string[];
}

export interface HardwarePrototypeItem {
  id: string;
  title: string;
  badge: string;
  category: string;
  description: string;
  primaryImage: string;
  schematicImage?: string;
  secondaryImage?: string;
  components: string[];
  metrics: string;
  galleryUrl: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  partner?: string;
  date?: string;
  credentialUrl: string;
  credentialId?: string;
  badgeAccent: string;
  badgeImage?: string;
  description: string;
  skills: string[];
}

export const personalInfo: PersonalInfo = {
  name: "Tanuj Mistry",
  title: "Electronics & Telecommunication Engineer",
  subtitle: "AI/ML & Embedded Systems Specialist",
  positioning: "Hardware + Software Hybrid Engineer bridging digital VLSI/FPGA architectures with machine learning models and real-time embedded intelligence.",
  bio: "Final-year Electronics & Telecommunication Engineering undergraduate at Government College of Engineering, Aurangabad. Combining deep silicon-level hardware understanding (Verilog/VHDL, Xilinx Vivado, FPGA acceleration, digital signal processing) with high-level software engineering (PyTorch/TensorFlow, Embedded C, RTOS, and CAN-bus telemetry). Passionate about edge AI, MedTech device architectures, and mission-critical embedded hardware.",
  email: "mistrytanuj@gmail.com",
  phone: "+91-8767875448",
  location: "Chandrapur, Maharashtra, India",
  linkedin: "https://linkedin.com/in/tanuj-mistry",
  github: "https://github.com",
  hardwareGalleryUrl: "https://photos.app.goo.gl/p37gJr7YaJqDeQi16",
  education: {
    degree: "B.Tech in Electronics & Telecommunication Engineering",
    major: "Electronics & Telecommunication",
    institution: "Government College of Engineering, Aurangabad",
    cgpa: "8.65 / 10.0",
    duration: "Nov 2022 – June 2026",
    status: "Final Year Undergraduate",
  },
};

export const skillCategories: SkillCategory[] = [
  {
    id: "fpga",
    title: "FPGA & Digital Design",
    iconName: "Cpu",
    skills: [
      "Xilinx Vivado",
      "Xilinx ISE",
      "Verilog HDL",
      "VHDL",
      "Timing Analysis",
      "VLSI Design",
      "RTL Synthesis",
      "PCB Design",
    ],
  },
  {
    id: "embedded",
    title: "Embedded Systems & IoT",
    iconName: "Microchip",
    skills: [
      "ARM Cortex",
      "ESP32",
      "Arduino",
      "8051",
      "AVR",
      "RTOS",
      "IoT Architecture",
      "Sensor Integration",
      "Hardware Debugging",
    ],
  },
  {
    id: "ml-ai",
    title: "Machine Learning & AI",
    iconName: "BrainCircuit",
    skills: [
      "TensorFlow",
      "Scikit-learn",
      "Deep Learning",
      "Convolutional Neural Networks (CNN)",
      "Quantized Inference",
      "Edge AI",
      "Supervised Learning",
      "Unsupervised Learning",
    ],
  },
  {
    id: "dsp-rf",
    title: "Signal Processing & RF",
    iconName: "Activity",
    skills: [
      "Digital Signal Processing (DSP)",
      "FIR / IIR Filters",
      "Analog Front-End (AFE)",
      "Power Electronics",
      "RF Design",
      "Biopotential Filtering",
    ],
  },
  {
    id: "protocols",
    title: "Communication Protocols",
    iconName: "Network",
    skills: [
      "CAN Bus",
      "SPI",
      "I2C",
      "UART",
      "TCP/IP",
      "MQTT",
      "HTTP",
      "Modbus",
    ],
  },
  {
    id: "languages",
    title: "Programming Languages",
    iconName: "Code",
    skills: [
      "Python",
      "C",
      "C++",
      "Embedded C",
      "MATLAB",
      "Verilog",
      "VHDL",
      "Assembly",
      "SQL",
      "HTML/CSS",
    ],
  },
  {
    id: "tools",
    title: "EDA & Engineering Tools",
    iconName: "Wrench",
    skills: [
      "MATLAB / Simulink",
      "Cadence",
      "LTSpice",
      "Proteus",
      "Keil µVision",
      "LabVIEW",
      "Altium Designer",
      "Git",
      "AutoCAD",
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: "nielit",
    role: "Project Intern",
    organization: "NIELIT Maharashtra",
    location: "Aurangabad, India",
    period: "Present",
    isCurrent: true,
    type: "Research",
    description:
      "Developing a flagship real-time ECG biopotential signal acquisition and arrhythmia classification system deployed on Xilinx FPGA with hardware-accelerated CNN inference.",
    achievements: [
      "Architected an end-to-end telemetry pipeline interfacing an SPI analog front-end (AFE) with a Xilinx FPGA.",
      "Engineered hardware-optimized FIR bandpass and notch filtering in Verilog for real-time motion artifact and 50Hz line noise rejection.",
      "Quantized and mapped a Convolutional Neural Network (CNN) onto FPGA fabric, enabling sub-10ms arrhythmia classification latency directly at the edge.",
    ],
    skills: ["Xilinx Vivado", "Verilog HDL", "CNN Quantization", "SPI AFE", "DSP", "MATLAB"],
  },
  {
    id: "mediastra",
    role: "R&D Intern",
    organization: "MediAstra Technologies Pvt Ltd",
    location: "Aurangabad, India",
    period: "Dec 2025",
    type: "Internship",
    description:
      "Engineered embedded systems and biometrics sensor integration for next-generation wearable healthcare devices and MedTech diagnostic prototypes.",
    achievements: [
      "Integrated analog sensors for physiological monitoring into low-power embedded microcontrollers.",
      "Optimized power-budget constraints and battery management protocols for continuous wearable telemetry.",
      "Developed firmware routines in Embedded C ensuring dependable real-time data streaming and fault resilience.",
    ],
    skills: ["Embedded C", "Sensor Integration", "Wearable MedTech", "Low-Power Firmware", "I2C/SPI"],
  },
  {
    id: "dhariwal",
    role: "Engineering Intern (Electrical & Instrumentation)",
    organization: "Dhariwal Infrastructure Ltd (600MW Thermal Power Plant)",
    location: "Chandrapur, India",
    period: "Summer 2024",
    type: "Internship",
    description:
      "Executed high-voltage transformer, numerical relay, and circuit breaker diagnostic testing while coordinating plant-wide SCADA monitoring systems.",
    achievements: [
      "Conducted fault analysis and diagnostic testing on transformers, protection relays, and vacuum circuit breakers.",
      "Optimized numerical relay coordination parameters, directly reducing critical equipment downtime by 15%.",
      "Monitored turbine and generator parameters via SCADA systems, ensuring adherence to industrial safety and grid compliance standards.",
    ],
    skills: ["SCADA Systems", "Relay Coordination", "Power Systems", "Circuit Breakers", "Fault Diagnosis"],
  },
  {
    id: "aryans-racing",
    role: "Data Acquisition (DAQ) Lead",
    organization: "Team Aryans Racing (Formula Student Team)",
    location: "Aurangabad, India",
    period: "2023 – 2024",
    type: "Leadership",
    description:
      "Led the telemetry and data acquisition division to engineer a multi-node automotive sensor network and wireless pit telemetry for the Formula Student racecar.",
    achievements: [
      "Designed and deployed a high-speed CAN-bus network capturing live data from 12+ onboard sensors (wheel speed, suspension travel, throttle/brake position).",
      "Built custom Arduino and ESP32 logging nodes coupled with long-range wireless RF transceivers for real-time vehicle-to-pit data transmission.",
      "Engineered custom MATLAB data visualization dashboards for trackside telemetry analysis, directly contributing to an 8% reduction in lap times.",
    ],
    skills: ["CAN Bus", "ESP32", "Arduino", "RF Telemetry", "MATLAB Dashboards", "Sensor Networks"],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "ecg-fpga-cnn",
    title: "Real-Time ECG Acquisition & Arrhythmia Classification",
    shortDescription:
      "Hardware-accelerated edge AI system: SPI-based analog front-end biopotential acquisition + CNN classification synthesized on Xilinx FPGA.",
    fullDescription:
      "A medical-grade biopotential diagnostic pipeline featuring a precision SPI analog front-end (AFE), real-time digital pre-processing in Verilog HDL, and an on-chip quantized Convolutional Neural Network (CNN). The architecture achieves sub-10ms classification of cardiac arrhythmias against the MIT-BIH Arrhythmia benchmark with ultra-low power consumption suitable for edge-deployed medical monitors.",
    tags: ["FPGA", "Verilog", "Vivado", "CNN", "Edge AI", "DSP", "SPI AFE", "MATLAB"],
    category: "FPGA & Hardware",
    isFlagship: true,
    metrics: "Sub-10ms edge inference | Low-power Vivado FPGA synthesis",
    highlights: [
      "Interfaced low-noise analog biopotential front-end via high-speed SPI serial link.",
      "Synthesized pipelined digital bandpass/notch filters in Verilog HDL for 50Hz mains and motion artifact cancellation.",
      "Implemented fixed-point 8-bit quantized weights and MAC matrix processing blocks for CNN inference.",
      "Validated against standard clinical MIT-BIH Arrhythmia records with high specificity and sensitivity.",
    ],
    tools: ["Xilinx Vivado", "Verilog HDL", "MATLAB / Simulink", "TensorFlow / Python", "Analog Front-End"],
  },
  {
    id: "fpga-dsp-filters",
    title: "FPGA-Based DSP System (FIR / IIR Filters at 50MHz)",
    shortDescription:
      "High-throughput digital signal processing architecture on FPGA executing real-time audio filtering at 50MHz clock frequency.",
    fullDescription:
      "Engineered dedicated hardware DSP pipelines in Verilog HDL implementing high-order Finite Impulse Response (FIR) and Infinite Impulse Response (IIR) filters. Features pipelined Multiply-Accumulate (MAC) units, fixed-point coefficient arithmetic, and real-time audio codec integration.",
    tags: ["FPGA", "Verilog", "DSP", "FIR/IIR", "Digital Filters", "50MHz Timing"],
    category: "Signal Processing",
    metrics: "50MHz operating frequency | Pipelined MAC hardware architecture",
    highlights: [
      "Designed pipelined hardware MAC units to maintain 50MHz timing closure without clock skew.",
      "Synthesized symmetric FIR filters reducing required multiplier count by 50%.",
      "Verified frequency response, ripple rejection, and bit-exact precision against MATLAB filter designer models.",
    ],
    tools: ["Verilog HDL", "Xilinx Vivado", "MATLAB", "Logic Analyzers"],
  },
  {
    id: "formula-telemetry",
    title: "Formula Student CAN-Bus Telemetry System",
    shortDescription:
      "Automotive telemetry network with 12+ sensors, real-time wireless RF pit comms, and MATLAB trackside diagnostic telemetry.",
    fullDescription:
      "A complete competition-grade data acquisition system designed for Team Aryans Racing. Interfaces 12+ analog and digital sensors across an automotive CAN-bus backbone, streaming vehicle dynamics to pit engineers via long-range RF for split-second tuning.",
    tags: ["CAN Bus", "Embedded Systems", "ESP32", "RF Wireless", "MATLAB", "Telemetry"],
    category: "Embedded & IoT",
    metrics: "12+ Live Sensors | 8% Lap Time Improvement",
    highlights: [
      "Designed fault-tolerant multi-node CAN communication architecture resilient to high-vibration automotive environments.",
      "Streamed wheel speed, suspension potentiometer travel, brake temperatures, and throttle position wirelessly to pit lane.",
      "Authored interactive MATLAB trackside telemetry GUI for driver coaching and suspension tuning.",
    ],
    tools: ["CAN Bus", "ESP32", "Arduino", "RF Modules", "MATLAB Dashboards", "Altium"],
  },
  {
    id: "predictive-maintenance",
    title: "ML-Based Industrial Predictive Maintenance",
    shortDescription:
      "Condition monitoring system predicting mechanical bearing and motor degradation with 92% classification accuracy.",
    fullDescription:
      "Developed a predictive maintenance platform utilizing multi-axis vibration, acoustic, and thermal sensor streams. Employs signal spectral feature extraction (FFT, kurtosis, skewness) fed into an optimized Random Forest classifier to detect early-stage motor bearing failure.",
    tags: ["Machine Learning", "Python", "Scikit-Learn", "Predictive Maintenance", "DSP", "Sensors"],
    category: "AI & Machine Learning",
    metrics: "92% Fault Classification Accuracy",
    highlights: [
      "Extracted time-domain and frequency-domain features (power spectral density, harmonic ratios, peak factors).",
      "Trained Random Forest and Gradient Boosting ensembles on high-dimensional industrial vibration datasets.",
      "Achieved 92% diagnostic accuracy in identifying outer-race, inner-race, and ball bearing faults prior to failure.",
    ],
    tools: ["Python", "Scikit-learn", "NumPy", "Pandas", "FFT Analysis", "Vibration Sensors"],
  },
  {
    id: "cnn-image-classification",
    title: "Deep CNN Image Classification Pipeline",
    shortDescription:
      "Convolutional Neural Network architecture with transfer learning achieving 89% benchmark accuracy and optimized inference.",
    fullDescription:
      "Constructed and fine-tuned deep convolutional networks using TensorFlow and Keras. Evaluated custom multi-layer CNNs against transfer-learning architectures (MobileNet, ResNet), incorporating advanced data augmentation, learning rate schedulers, and weight pruning.",
    tags: ["Deep Learning", "TensorFlow", "Keras", "CNN", "Computer Vision", "Python"],
    category: "AI & Machine Learning",
    metrics: "89% Multi-Class Accuracy",
    highlights: [
      "Built custom convolutional feature extractor blocks with batch normalization and dropout regularization.",
      "Benchmarked MobileNetV2 transfer learning with depthwise separable convolutions for edge deployment.",
      "Conducted extensive hyperparameter tuning on GPU clusters to reach 89% top-1 validation accuracy.",
    ],
    tools: ["TensorFlow", "Keras", "OpenCV", "Python", "Matplotlib"],
  },
  {
    id: "smart-energy-meter",
    title: "Smart Energy Meter with Cloud IoT Telemetry",
    shortDescription:
      "IoT energy monitoring system with PZEM-004T AC sensor, real-time power calculation, automatic relay cutoff, and cloud telemetry.",
    fullDescription:
      "An automated smart electrical metering solution powered by ESP8266 NodeMCU and micro-sensing hardware. Measures AC mains voltage, RMS current, active power, and energy consumption in real-time using a PZEM-004T v3.0 module, featuring an LCD 1602 I2C display, 5V relay overload cutoff, and cloud MQTT telemetry with overcurrent protection.",
    tags: ["IoT", "ESP8266", "PZEM-004T", "Relay Cutoff", "Embedded C", "Cloud"],
    category: "Embedded & IoT",
    metrics: "Real-time RMS metering | Automated Overload Cut-Off",
    highlights: [
      "Interfaced PZEM-004T v3.0 sensor and LCD 1602 display via I2C with ESP8266 NodeMCU.",
      "Programmed real-time RMS voltage (245V), current (mA/A), and cumulative kilowatt-hour monitoring.",
      "Engineered automated safety cut-off driving a 5V relay module and RCCB residual breaker under surge conditions.",
      "Validated through physical AC benchtop testing with active electrical load and serial diagnostics.",
    ],
    tools: ["ESP8266 NodeMCU", "PZEM-004T v3.0", "LCD 1602 I2C", "5V Relay Module", "RCCB", "Embedded C"],
    galleryUrl: "https://photos.app.goo.gl/p37gJr7YaJqDeQi16",
    image: "/assets/projects/photo_1.jpg",
    schematicImage: "/assets/projects/photo_12.jpg",
    hardwareTags: ["ESP8266", "PZEM-004T", "LCD 1602", "5V Relay", "230V AC Bench"],
  },
  {
    id: "vehicle-alcohol-interlock",
    title: "Vehicle Alcohol Interlock & Safety Telemetry",
    shortDescription:
      "Automotive safety system combining MQ-3 breathalyzer sensing with Arduino UNO, dual H-bridge motor cutoff, and GPS emergency telemetry.",
    fullDescription:
      "An embedded automotive safety prototype designed to prevent drunk driving. Built around an Arduino UNO interfacing an MQ-3 alcohol vapor sensor with calibrated analog threshold detection. Upon detecting elevated alcohol concentration, the controller activates an emergency lockout via an L298N dual H-bridge motor driver—shutting down the DC motor powertrain while streaming GPS coordinates and alerting emergency dispatch.",
    tags: ["Arduino UNO", "MQ-3 Sensor", "L298N Driver", "GPS Telemetry", "Vehicle Safety", "Embedded C"],
    category: "Embedded & IoT",
    metrics: "Instant Ignition Interlock | Real-Time GPS Alert",
    highlights: [
      "Calibrated MQ-3 analog sensor for driver breath alcohol concentration thresholding in real-time.",
      "Implemented automatic DC motor ignition cutoff using an L298N dual H-bridge motor driver.",
      "Integrated GPS antenna module and GSM modem for emergency location broadcasting.",
      "Validated with physical breadboard test bench, serial monitor diagnostics, and active aerosol testing.",
    ],
    tools: ["Arduino UNO", "MQ-3 Gas Sensor", "L298N H-Bridge", "GPS Antenna", "LCD 1602", "Embedded C"],
    galleryUrl: "https://photos.app.goo.gl/p37gJr7YaJqDeQi16",
    image: "/assets/projects/photo_8.jpg",
    schematicImage: "/assets/projects/photo_5.jpg",
    hardwareTags: ["Arduino UNO", "MQ-3 Sensor", "L298N H-Bridge", "GPS Antenna", "DC Motor"],
  },
];

export const GOOGLE_PHOTOS_PROJECTS_URL = "https://photos.app.goo.gl/p37gJr7YaJqDeQi16";

export const hardwarePrototypes: HardwarePrototypeItem[] = [
  {
    id: "smart-energy-meter-bench",
    title: "Smart AC Energy Meter & Protection Hub",
    badge: "LIVE 230V AC BENCH",
    category: "Power Electronics & IoT",
    description: "ESP8266 + PZEM-004T v3.0 module measuring RMS Voltage (107V/245V), Current (3150mA), Active Power (340W), and Energy (1.43kWh) with 5V relay overload cutoff and 1602 LCD readout.",
    primaryImage: "/assets/projects/photo_1.jpg",
    schematicImage: "/assets/projects/photo_12.jpg",
    secondaryImage: "/assets/projects/photo_13.jpg",
    components: ["ESP8266 NodeMCU", "PZEM-004T v3.0", "LCD 1602 I2C", "5V Relay Module", "RCCB Breaker", "AC Load"],
    metrics: "Real-time RMS Metering & Relay Cutoff",
    galleryUrl: GOOGLE_PHOTOS_PROJECTS_URL,
  },
  {
    id: "alcohol-interlock-bench",
    title: "Automotive Alcohol Detection & Ignition Interlock",
    badge: "SAFETY INTERLOCK BENCH",
    category: "Automotive & Sensor Telemetry",
    description: "Arduino UNO interfacing MQ-3 breathalyzer sensor with live Serial Monitor diagnostics, emergency GPS location broadcast, and L298N dual H-bridge motor driver engine shutdown.",
    primaryImage: "/assets/projects/photo_8.jpg",
    schematicImage: "/assets/projects/photo_5.jpg",
    secondaryImage: "/assets/projects/photo_6.jpg",
    components: ["Arduino UNO", "MQ-3 Alcohol Sensor", "L298N H-Bridge", "GPS Antenna", "DC Motor", "LCD 1602"],
    metrics: "Sub-second Ignition Lock & GPS Broadcast",
    galleryUrl: GOOGLE_PHOTOS_PROJECTS_URL,
  },
  {
    id: "thingspeak-iot-bench",
    title: "Cloud IoT Environmental Telemetry & ThingSpeak Analytics",
    badge: "CLOUD TELEMETRY BENCH",
    category: "IoT & Environmental Sensing",
    description: "Benchtop prototype featuring 0.96\" I2C OLED display (33.0°C, 23.3% RH) and DHT sensor wired to ESP32 streaming live telemetry channels to ThingSpeak with MATLAB visualizations.",
    primaryImage: "/assets/projects/photo_10.jpg",
    schematicImage: "/assets/projects/photo_9.jpg",
    secondaryImage: "/assets/projects/photo_11.jpg",
    components: ["ESP32 Dev Board", "0.96\" I2C OLED", "DHT Sensor", "ThingSpeak Cloud API", "MATLAB Analytics"],
    metrics: "Live Multi-channel Cloud Telemetry",
    galleryUrl: GOOGLE_PHOTOS_PROJECTS_URL,
  },
  {
    id: "sensor-test-rig",
    title: "Gas Sensing, Acoustic Alarm & Multi-Sensor Rig",
    badge: "SENSOR CALIBRATION BENCH",
    category: "Signal Conditioning & Actuation",
    description: "Arduino UNO breadboard test rig validating MQ-4 gas detection, spray aerosol triggering, acoustic piezo buzzer thresholds, and DC motor load characterization with 9V battery power.",
    primaryImage: "/assets/projects/photo_7.jpg",
    schematicImage: "/assets/projects/photo_2.jpg",
    secondaryImage: "/assets/projects/photo_4.jpg",
    components: ["Arduino UNO", "MQ-4 Gas Sensor", "Piezo Buzzer", "DC Motor Bench", "9V Hi-Watt Rail"],
    metrics: "Hardware Threshold & Actuation Verification",
    galleryUrl: GOOGLE_PHOTOS_PROJECTS_URL,
  },
];

export const certifications: CertificationItem[] = [
  {
    id: "cisco-networking",
    title: "Networking Devices and Initial Configuration",
    issuer: "Cisco",
    partner: "Credly Digital Credential",
    credentialUrl: "https://www.credly.com/badges/3f0c72e5-a3de-4a82-a8e8-54bc758e086a/public_url",
    credentialId: "3f0c72e5-a3de-4a82-a8e8-54bc758e086a",
    badgeAccent: "#00bceb",
    badgeImage: "/assets/cisco_networking_badge.png",
    description:
      "Cisco-verified credential demonstrating competency in network architectures, IPv4 and IPv6 address calculation, switch and router initial configuration, virtualization, and network troubleshooting across 7 hands-on labs and 12 Cisco Packet Tracer network simulation topologies.",
    skills: ["Cisco Packet Tracer", "IPv4 & IPv6 Subnetting", "Router & Switch Config", "Virtualization", "Network Diagnostics"],
  },
  {
    id: "deeplearning-supervised-ml",
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI & Stanford Online",
    partner: "Taught by Andrew Ng",
    credentialUrl: "https://coursera.org/share/382d6bbb928c325913dcfeee7ec87697",
    credentialId: "Q2VPQH4HTCVU",
    badgeAccent: "#00e5c7",
    description:
      "Authorized by Stanford Online and DeepLearning.AI. Rigorous foundation in machine learning theory and mathematical implementations: multivariable linear regression, gradient descent optimization, cost function derivation, logistic classification, feature scaling, and L1/L2 regularization implemented in Python and NumPy.",
    skills: ["Linear Regression", "Logistic Regression", "Gradient Descent", "L1/L2 Regularization", "Cost Optimization", "NumPy"],
  },
  {
    id: "deeplearning-unsupervised-rl",
    title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
    issuer: "DeepLearning.AI & Stanford Online",
    partner: "Taught by Andrew Ng",
    credentialUrl: "https://coursera.org/share/32d5a12143edf6bcfe6075de316ecd70",
    credentialId: "IN0GPIB6O0C5",
    badgeAccent: "#a855f7",
    description:
      "Authorized by Stanford Online and DeepLearning.AI. Advanced machine learning algorithms: unsupervised K-means clustering, anomaly detection with multi-dimensional Gaussian probability distributions, collaborative filtering and content-based recommendation systems, and reinforcement learning with Deep Q-Networks.",
    skills: ["K-Means Clustering", "Anomaly Detection", "Recommender Systems", "Deep Q-Learning", "Reinforcement Learning"],
  },
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];
