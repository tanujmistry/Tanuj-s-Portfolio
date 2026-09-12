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
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  badgeAccent: string;
  description: string;
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
      "IoT energy monitoring system with CT/PT sensors, real-time power factor calculation, MQTT cloud streaming, and mobile dashboard.",
    fullDescription:
      "An automated smart electrical metering solution powered by ESP8266 and micro-sensing hardware. Measures AC voltage, RMS current, active power, reactive power, and power factor in real-time, streaming telemetry over MQTT to a secure cloud dashboard with overcurrent alerts.",
    tags: ["IoT", "ESP8266", "Embedded C", "MQTT", "Power Electronics", "Cloud"],
    category: "Embedded & IoT",
    metrics: "Real-time RMS metering | Automated Overload Cut-Off",
    highlights: [
      "Interfaced non-invasive current transformers (CT) and voltage potential transformers (PT) with analog filtering.",
      "Programmed real-time phase angle detection for accurate power factor computation in firmware.",
      "Published telemetry packets via MQTT protocol to cloud brokers with instant alert thresholds.",
    ],
    tools: ["ESP8266", "Arduino IDE", "MQTT", "Blynk / Cloud Dashboard", "Proteus", "Eagle CAD"],
  },
];

export const certifications: CertificationItem[] = [
  {
    id: "cert-ml",
    title: "Machine Learning Specialization",
    issuer: "Stanford University & DeepLearning.AI",
    badgeAccent: "#00e5c7",
    description: "Supervised Machine Learning, Advanced Learning Algorithms, Unsupervised Learning, Recommenders, and Reinforcement Learning taught by Andrew Ng.",
  },
  {
    id: "cert-dl",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    badgeAccent: "#22d3ee",
    description: "Neural Networks & Deep Learning, Hyperparameter Tuning, Structuring ML Projects, Convolutional Neural Networks, and Sequence Models.",
  },
  {
    id: "cert-tf",
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    badgeAccent: "#10b981",
    description: "Hands-on competency in building, training, and deploying TensorFlow models for computer vision, time-series forecasting, and natural language processing.",
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
