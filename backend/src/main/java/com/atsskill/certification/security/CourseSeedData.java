package com.atsskill.certification.security;

import com.atsskill.certification.model.Course;
import com.atsskill.certification.model.CourseStatus;
import com.atsskill.certification.model.Question;
import com.atsskill.certification.model.QuestionOption;

import java.util.ArrayList;
import java.util.List;

public class CourseSeedData {

    public static class SeedCoursePackage {
        public Course course;
        public List<Question> questions = new ArrayList<>();

        public SeedCoursePackage(Course course) {
            this.course = course;
        }

        public void add(String text, String opt1, String opt2, String opt3, String opt4, String correctId, String exp) {
            List<QuestionOption> options = List.of(
                    new QuestionOption("1", opt1),
                    new QuestionOption("2", opt2),
                    new QuestionOption("3", opt3),
                    new QuestionOption("4", opt4)
            );
            questions.add(new Question(null, text, options, List.of(correctId), exp, "MEDIUM"));
        }
    }

    public static List<SeedCoursePackage> getSeedPackages() {
        List<SeedCoursePackage> list = new ArrayList<>();
        list.add(getCyberJobSimulationPackage());
        list.add(getPythonDataSciencePackage());
        list.add(getCloudDevOpsPackage());
        list.add(getBusinessAnalyticsPackage());
        list.add(getFinancialAnalyticsPackage());
        list.add(getBcaWebDevelopmentPackage());
        return list;
    }

    // 1. Cyber Job Simulation (B.Tech / Computer Science & IT)
    private static SeedCoursePackage getCyberJobSimulationPackage() {
        Course c = new Course(
                "Cyber Job Simulation: Enterprise Threat Defense & Incident Response",
                "cyber-job-simulation-threat-defense",
                "B.Tech",
                "Rigorous enterprise cybersecurity job simulation covering SOC Tier 1/2 alert triage, SIEM threat hunting, packet forensics, malware containment, and Zero Trust access architecture.",
                35, 30, 60, 1, CourseStatus.PUBLISHED
        );
        c.setSyllabus(List.of(
                "SOC Incident Response Lifecycle & Triaging",
                "SIEM Log Analysis & Threat Hunting (Splunk/ELK)",
                "Network Forensics & Packet Dissection (Wireshark)",
                "Zero Trust Architecture & Cryptographic Defenses"
        ));

        SeedCoursePackage p = new SeedCoursePackage(c);
        p.add("Which phase of the Cyber Kill Chain immediately follows Weaponization?", "Reconnaissance", "Delivery", "Exploitation", "Installation", "2", "Delivery directly follows weaponization in the Lockheed Martin Cyber Kill Chain.");
        p.add("What is the primary role of a Security Operations Center (SOC) Tier 1 Analyst?", "Remediate firewall firmware vulnerabilities", "Triage, analyze, and escalate suspicious incoming security alerts", "Perform reverse engineering on compiled kernel drivers", "Draft national cybersecurity policies", "2", "Tier 1 analysts conduct primary alert triage and validate incident signals.");
        p.add("Which HTTP status code commonly reveals unhandled backend database errors during SQL injection testing?", "200 OK", "302 Found", "500 Internal Server Error", "404 Not Found", "3", "500 Internal Server Error often occurs when malformed SQL syntax causes database exceptions.");
        p.add("What type of attack involves poisoning DNS query responses to misdirect legitimate users to attacker servers?", "DNS Spoofing / Cache Poisoning", "SYN Flood", "ARP Reflection", "BGP Hijacking", "1", "DNS cache poisoning injects corrupt DNS records to redirect network traffic.");
        p.add("Which symmetric encryption algorithm is mandated by NIST for classified enterprise data at rest?", "DES-56", "RC4", "AES-256", "Blowfish", "3", "AES-256 is the internationally accepted standard for military-grade symmetric encryption.");
        p.add("In network packet analysis, which TCP flag combination indicates a classic SYN flood attack?", "Excessive SYN packets without returning ACKs", "Continuous FIN-ACK exchanges", "RST flags on all closed UDP sockets", "PSH flags with zero payload", "1", "SYN floods overwhelm connection backlog queues by leaving half-open TCP states without ACKs.");
        p.add("What is the core philosophical tenet of a Zero Trust Architecture (ZTA)?", "Trust internal subnet packets implicitly", "Never trust, always verify every access request regardless of origin", "Authenticate only once per 24 hours", "Rely entirely on external boundary firewalls", "2", "Zero Trust enforces continuous verification of identity and least privilege everywhere.");
        p.add("Which tool is widely utilized in enterprise SOC environments for SIEM data correlation?", "Splunk Enterprise", "VLC Player", "Postman", "FileZilla", "1", "Splunk is an industry-leading SIEM platform for real-time log ingestion and correlation.");
        p.add("What classification of malware disguises itself as harmless software to provide backdoor persistence?", "Worm", "Trojan Horse", "Ransomware", "Spyware", "2", "A Trojan masquerades as benign software while harboring unauthorized backdoor payloads.");
        p.add("In digital forensics, why must a write-blocker device be utilized prior to imaging storage media?", "To accelerate SSD sector read speeds", "To prevent any alteration of evidence bits on the source disk", "To decrypt BitLocker partitions instantly", "To wipe residual master boot records", "2", "Write-blockers preserve evidentiary integrity by blocking write commands to original drives.");
        p.add("Which web vulnerability occurs when untrusted input is reflected into browser DOM without escaping?", "SQL Injection", "Cross-Site Scripting (XSS)", "Path Traversal", "Server-Side Request Forgery", "2", "XSS allows adversaries to execute malicious JavaScript in victim browsers.");
        p.add("What is the primary mechanism of an ARP Cache Poisoning attack?", "Injecting spoofed ARP replies linking attacker MAC with gateway IP", "Flooding DNS servers with random queries", "Overriding DHCP scope options", "Modifying SSL certificates in flight", "1", "ARP spoofing associates an attacker's MAC address with a target gateway's IP address on the local LAN.");
        p.add("Which framework created by MITRE systematically indexes adversary tactics and techniques?", "OWASP Top 10", "MITRE ATT&CK", "NIST CSF", "ISO 27001", "2", "MITRE ATT&CK provides a curated matrix of real-world adversary behaviors.");
        p.add("What token-based countermeasure prevents Cross-Site Request Forgery (CSRF)?", "Synchronizer Anti-CSRF Tokens", "HTTP Basic Authentication", "Dynamic DNS updates", "Client-side alert boxes", "1", "Synchronizer CSRF tokens ensure that state-changing requests originate from legitimate application forms.");
        p.add("Which protocol provides encrypted administrative shell access over TCP port 22?", "Telnet", "FTP", "SSH", "SNMP", "3", "SSH (Secure Shell) encrypts administrative traffic over port 22.");
        p.add("What does 'DDoS' stand for in distributed infrastructure threat management?", "Direct Denial of Strategy", "Distributed Denial of Service", "Dynamic Defense of Systems", "Decentralized Domain of Security", "2", "DDoS represents Distributed Denial of Service attacks originating from multiple compromised hosts.");
        p.add("In penetration testing, how does 'White Box' testing differ from 'Black Box' testing?", "White Box assumes full internal access, diagrams, and source code", "White Box is conducted exclusively at night", "White Box forbids the use of automated scanners", "White Box tests only physical security doors", "1", "White Box testing provides full architectural visibility to assess internal controls deeply.");
        p.add("What is the default TCP port utilized for LDAP over SSL (LDAPS)?", "389", "636", "443", "88", "2", "TCP port 636 is the standard assigned port for encrypted LDAPS traffic.");
        p.add("What is the primary architectural purpose of a Honeypot?", "Accelerate edge caching of static web assets", "Serve as a monitored decoy to detect and analyze attacker intrusion tactics", "Store archived database backup tapes", "Load-balance high-volume TLS handshakes", "2", "Honeypots act as monitored decoys to capture adversary telemetry.");
        p.add("Which Linux command inspects active listening TCP/UDP sockets with process IDs?", "ss -tulpn", "ls -la", "grep -r", "cat /etc/passwd", "1", "ss -tulpn displays TCP/UDP listening sockets along with process ownership details.");
        p.add("Why is Time-based One-Time Password (TOTP) considered more resilient than SMS-based OTP?", "SMS requires expensive telecom licenses", "TOTP is mathematically immune to cellular SIM-swapping and SS7 interception", "TOTP passwords never expire", "SMS messages can only contain hexadecimal characters", "2", "TOTP is generated cryptographically on the device, resisting SIM swap and telecom hijacking.");
        p.add("Which asymmetric key-exchange mechanism provides Perfect Forward Secrecy (PFS) in TLS 1.3?", "Static RSA", "ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)", "MD5 Handshake", "RC4 Stream Cipher", "2", "ECDHE generates ephemeral session keys ensuring past captures cannot be decrypted later.");
        p.add("What security warning is raised when a server SSL certificate domain name fails to match the browser URL?", "Expired Certificate Warning", "Hostname Mismatch / Subject Alternative Name (SAN) Error", "Weak Cipher Suite Error", "OCSP Revocation Timeout", "2", "Hostname mismatch occurs when the requested domain is not listed in the certificate CN or SAN.");
        p.add("Which Windows Event ID signals successful network-based logon (Type 3) during lateral movement?", "Event ID 1102", "Event ID 4624", "Event ID 4688", "Event ID 7045", "2", "Event ID 4624 records logon events; Logon Type 3 specifically highlights network authentications.");
        p.add("What is the primary function of a Web Application Firewall (WAF)?", "Enforce boundary routing across BGP peers", "Inspect Layer 7 HTTP/HTTPS traffic to block exploits like SQLi and XSS", "Defragment hard drives periodically", "Generate public-private SSH keys", "2", "A WAF inspects HTTP payloads to prevent application-layer attacks.");
        p.add("In the incident response cycle, what is the primary objective of the 'Containment' phase?", "Format all servers immediately", "Prevent the attack from spreading and inflicting further enterprise damage", "Publish a public press release", "Terminate the SOC team contracts", "2", "Containment isolates compromised assets to stop lateral movement.");
        p.add("Which legacy hashing algorithm is forbidden for digital signatures due to proven collision vulnerabilities?", "SHA-256", "SHA-512", "MD5", "BLAKE2", "3", "MD5 is cryptographically broken and vulnerable to practical collision attacks.");
        p.add("What does the acronym 'EDR' signify in modern enterprise endpoint defense?", "Enterprise Data Redirection", "Endpoint Detection and Response", "External Defense Router", "Encrypted Directory Registry", "2", "EDR continuously collects telemetry on endpoints to detect behavioral anomalies.");
        p.add("Which HTTP response header forces client browsers to exclusively connect via HTTPS?", "Strict-Transport-Security (HSTS)", "Content-Security-Policy", "X-Frame-Options", "Access-Control-Allow-Origin", "1", "HSTS prevents SSL-stripping attacks by requiring HTTPS connections exclusively.");
        p.add("In Wireshark, which display filter specifically isolates outbound DNS queries?", "dns.flags.response == 0", "http.request.method == 'GET'", "tcp.port == 80", "ip.addr == 127.0.0.1", "1", "dns.flags.response == 0 isolates standard DNS query packets.");
        p.add("What distinguishes an Intrusion Prevention System (IPS) from an Intrusion Detection System (IDS)?", "An IPS only reads packet headers", "An IPS sits inline to actively drop malicious packets, while an IDS only alerts", "An IDS requires root access to run", "An IPS operates strictly offline", "2", "An inline IPS actively terminates malicious traffic in real time.");
        p.add("Which security framework principle mandates granting users only the minimum access needed for job duties?", "Principle of Least Privilege (PoLP)", "Defense in Depth", "Fail-Safe Defaults", "Complete Mediation", "1", "Least Privilege minimizes exposure by restricting access to necessary capabilities only.");

        return p;
    }

    // 2. Python for Data Science & Machine Learning Systems (BCA / Computer Science & IT)
    private static SeedCoursePackage getPythonDataSciencePackage() {
        Course c = new Course(
                "Python for Data Science & Machine Learning Systems",
                "python-data-science-machine-learning",
                "BCA",
                "End-to-end data science and machine learning job simulation evaluating NumPy vectorization, Pandas feature engineering pipelines, Scikit-Learn models, hyperparameters, and deep learning foundations.",
                35, 30, 60, 1, CourseStatus.PUBLISHED
        );
        c.setSyllabus(List.of(
                "NumPy Vectorization & Scientific Computing",
                "Pandas Data Wrangling, Cleaning & Feature Pipelines",
                "Scikit-Learn Supervised & Unsupervised Modeling",
                "Hyperparameter Optimization & Neural Network Architectures"
        ));

        SeedCoursePackage p = new SeedCoursePackage(c);
        p.add("Which NumPy function instantiates an identity matrix of dimension n x n?", "np.zeros(n)", "np.ones(n)", "np.eye(n)", "np.diag(n)", "3", "np.eye(n) returns a 2-D array with ones on the diagonal and zeros elsewhere.");
        p.add("In Pandas, what is the fundamental functional difference between .loc and .iloc?", ".loc is label-based, whereas .iloc is integer position-based", ".loc only accepts boolean masks", ".iloc operates exclusively on Series objects", ".loc modifies data in place while .iloc returns a view", "1", ".loc indexes by labels/names while .iloc indexes strictly by integer positions.");
        p.add("What does the 'Curse of Dimensionality' describe in machine learning engineering?", "Models running out of CPU RAM", "Data sparsity increasing exponentially as feature space grows, risking overfitting", "Gradient vanishing in deep networks", "Target labels having imbalanced classes", "2", "High feature dimensions make sample points sparse, drastically increasing variance.");
        p.add("Which loss function is mathematically standard for training multi-class classification neural networks?", "Mean Squared Error (MSE)", "Binary Cross-Entropy", "Categorical Cross-Entropy", "Hinge Loss", "3", "Categorical cross-entropy measures cross-entropy loss across mutually exclusive categories.");
        p.add("What technique mitigates overfitting in Decision Trees by pruning branches with marginal statistical gain?", "Cost Complexity Pruning", "Data Augmentation", "Batch Normalization", "Gradient Clipping", "1", "Pruning removes non-informative subtree branches to improve generalization.");
        p.add("In Scikit-Learn, which module houses cross-validation tools like KFold and train_test_split?", "sklearn.preprocessing", "sklearn.model_selection", "sklearn.metrics", "sklearn.pipeline", "2", "sklearn.model_selection provides tools for dataset splitting and cross-validation.");
        p.add("What is the primary role of non-linear activation functions in deep artificial neural networks?", "To speed up matrix multiplication", "To enable networks to approximate non-linear decision boundaries", "To normalize weights to zero mean", "To eliminate backpropagation calculations", "2", "Activation functions introduce non-linearity, allowing networks to learn complex functions.");
        p.add("Which machine learning algorithm seeks a separating hyperplane that maximizes the geometric margin between classes?", "K-Nearest Neighbors", "Support Vector Machines (SVM)", "Naive Bayes", "Linear Discriminant Analysis", "2", "SVM finds the optimal maximum-margin hyperplane separating classes.");
        p.add("In unsupervised K-Means clustering, which method inspects within-cluster sum of squares to identify the optimal k?", "Silhouette Metric", "Elbow Method with Inertia", "ROC Curve", "Confusion Matrix", "2", "The Elbow Method plots inertia against k to identify the point of diminishing returns.");
        p.add("What does the ROC-AUC score measure in binary classification models?", "Average latency of inference queries", "Trade-off between True Positive Rate and False Positive Rate across all thresholds", "Total accuracy on training data", "Ratio of precision to recall at threshold 0.5", "2", "ROC-AUC evaluates diagnostic ability across all possible classification thresholds.");
        p.add("Which Pandas method replaces NaN and missing values across columns with designated values?", "dropna()", "fillna()", "isna()", "interpolate()", "2", "fillna() replaces missing NaN values with specified scalars or aggregated statistics.");
        p.add("What occurs during gradient descent optimization if the learning rate parameter is configured too high?", "Model converges in exactly one epoch", "Parameters overshoot the minimum and the loss function diverges", "Gradients strictly vanish to zero", "Weights freeze completely", "2", "An excessively large learning rate causes step oscillation and divergence.");
        p.add("What mathematical objective does Principal Component Analysis (PCA) optimize?", "Minimizes classification error", "Projects data along orthogonal axes that maximize variance", "Finds non-linear cluster boundaries", "Eliminates categorical variables automatically", "2", "PCA computes orthogonal eigenvectors that capture maximal dataset variance.");
        p.add("Which ensemble machine learning architecture builds trees sequentially to minimize the residuals of previous trees?", "Random Forest", "Gradient Boosted Decision Trees (GBDT / XGBoost)", "Bagging Classifier", "Voting Classifier", "2", "Boosting trains successive weak learners sequentially to correct errors of prior models.");
        p.add("What metric measures the proportion of variance in the dependent variable explained by a linear regression model?", "Mean Absolute Error", "R-squared (Coefficient of Determination)", "Root Mean Squared Error", "Adjusted P-Value", "2", "R-squared expresses the percentage of total variance explained by model predictors.");
        p.add("Which Python library is the standard industry framework for tensor manipulation and GPU deep learning?", "PyTorch", "Flask", "BeautifulSoup", "Requests", "1", "PyTorch provides hardware-accelerated tensor computations and deep neural networks.");
        p.add("What is the conventional distance metric utilized in standard K-Nearest Neighbors (KNN)?", "Manhattan distance", "Euclidean distance", "Cosine similarity", "Hamming distance", "2", "Standard KNN algorithms default to Euclidean (L2) distance in feature space.");
        p.add("Which Pandas operation groups DataFrame records by categorical columns to calculate summary aggregates?", "pivot_table()", "groupby()", "merge()", "concat()", "2", "groupby() splits data into groups based on criteria, applies functions, and combines results.");
        p.add("What is 'Data Leakage' in machine learning pipeline construction?", "Saving training datasets to public repositories", "Contaminating model training features with target information from the test dataset", "Corrupting CSV file encodings", "Underfitting due to small sample size", "2", "Data leakage occurs when test set signals inadvertently influence feature transformations.");
        p.add("Which regularization technique adds the absolute sum of coefficient weights (L1 penalty) to the objective loss?", "Ridge Regularization", "Lasso Regularization", "ElasticNet with l1_ratio=0", "Dropout", "2", "Lasso (L1) penalizes absolute weight magnitudes, driving sparse coefficients to zero.");
        p.add("Which regularization technique penalizes the squared sum of coefficient weights (L2 penalty)?", "Lasso Regularization", "Ridge Regularization", "Early Stopping", "Gradient Clipping", "2", "Ridge (L2) shrinks model coefficients towards zero without eliminating them completely.");
        p.add("What four outcomes are summarized in a binary classifier Confusion Matrix?", "Mean, Median, Mode, Variance", "True Positives, False Positives, True Negatives, False Negatives", "Input, Hidden, Output, Activation", "Precision, Recall, F1, Support", "2", "A Confusion Matrix tallies TP, FP, TN, and FN outcomes across predictions.");
        p.add("In Python 3.7+, which built-in key-value container is guaranteed to maintain insertion order?", "set", "dict", "tuple", "frozenset", "2", "Python dict retains insertion order as a standard language specification.");
        p.add("What does the Pandas method .describe() output when called on numerical DataFrame columns?", "First 5 rows of data", "Descriptive statistics including count, mean, std, min, quartiles, and max", "Column memory usage and data types", "Correlation matrix of features", "2", ".describe() computes essential parametric summary statistics for continuous columns.");
        p.add("When evaluating a classifier on a severely imbalanced dataset (e.g. 99% negative class), which metric is most reliable?", "Raw Accuracy", "Precision-Recall AUC / F1-Score", "Mean Squared Error", "Training Loss", "2", "F1-score and PR-AUC assess precision and recall trade-offs without skew from majority negatives.");
        p.add("What capability does NumPy array broadcasting offer during mathematical operations?", "Automatic multi-threading on GPUs", "Executing arithmetic operations on arrays of compatible differing shapes without duplication", "Compressing floating point arrays to 8-bit integers", "Encrypting array buffers in memory", "2", "Broadcasting stretches array dimensions virtually to enable elementwise arithmetic.");
        p.add("In Random Forest ensembles, how is tree diversity ensured during bootstrap aggregation?", "Each tree is trained on random data samples with random subsets of features considered per split", "All trees share identical hyperparameter depths", "Trees are trained on sequentially weighted residual errors", "Trees are pruned to a single decision node", "1", "Random Forests inject randomness via bagging and feature sub-sampling at every node split.");
        p.add("Which Scikit-Learn transformer standardizes numerical features to zero mean and unit variance?", "MinMaxScaler", "StandardScaler", "RobustScaler", "Normalizer", "2", "StandardScaler rescales continuous features so mean=0 and standard deviation=1.");
        p.add("What is the resulting 2D shape of a 1D NumPy array with 5 elements when reshaped using arr.reshape(-1, 1)?", "(1, 5)", "(5, 1)", "(5,)", "(1, 1)", "2", "Reshaping with (-1, 1) converts a 1D vector of length 5 into a 2D column vector of shape (5, 1).");
        p.add("What does 'Early Stopping' regulate during iterative neural network training?", "Halts gradient backpropagation after 10 seconds", "Stops training when validation performance ceases to improve, mitigating overfitting", "Reduces batch size dynamically", "Resets weights to zero if loss goes negative", "2", "Early stopping halts epochs when validation loss plateaus, preserving generalization.");
        p.add("In Natural Language Processing, what does the text representation acronym 'TF-IDF' represent?", "Total Frequency - Integrated Data Format", "Term Frequency - Inverse Document Frequency", "Token Filtration - Indexed Distribution Factor", "Target Frequency - Internal Domain Function", "2", "TF-IDF quantifies word importance relative to document frequency across a corpus.");
        p.add("Which Python keyword creates a lightweight anonymous inline callable function?", "def", "lambda", "yield", "async", "2", "The lambda keyword constructs anonymous single-expression functions.");

        return p;
    }

    // 3. Cloud Native DevOps & Kubernetes Systems Engineering (B.Tech / Computer Science & IT)
    private static SeedCoursePackage getCloudDevOpsPackage() {
        Course c = new Course(
                "Cloud Native DevOps & Kubernetes Systems Engineering",
                "cloud-native-devops-kubernetes",
                "Computer Science & IT",
                "Comprehensive systems engineering certification covering Docker container internals, Kubernetes workload controllers, Ingress routing, CI/CD automation, Infrastructure as Code, and Prometheus monitoring.",
                35, 30, 60, 1, CourseStatus.PUBLISHED
        );
        c.setSyllabus(List.of(
                "Docker Container Architecture & Multi-Stage Builds",
                "Kubernetes Core Objects (Pods, Deployments, Services, Ingress)",
                "Infrastructure as Code (Terraform) & GitOps CI/CD",
                "Observability, Prometheus Metrics & Distributed Tracing"
        ));

        SeedCoursePackage p = new SeedCoursePackage(c);
        p.add("What Linux kernel feature enables Docker to isolate container process trees and hostnames?", "Cgroups (Control Groups)", "Namespaces", "Seccomp", "AppArmor", "2", "Linux Namespaces isolate process trees, network stacks, IPC, and mount points.");
        p.add("What Linux kernel mechanism enforces resource limits (CPU, memory, I/O) on containers?", "Namespaces", "Cgroups (Control Groups)", "SELinux", "Systemd", "2", "Cgroups meter and limit hardware resource consumption per container.");
        p.add("In a Dockerfile, which instruction specifies the command executed when the container starts and cannot be easily overridden?", "RUN", "ENTRYPOINT", "ENV", "EXPOSE", "2", "ENTRYPOINT configures the executable container binary that runs by default.");
        p.add("Why are multi-stage Docker builds widely adopted in production pipelines?", "They create multiple container runtime processes", "They minimize final image size by discarding build toolchains and compiling dependencies", "They speed up network DNS lookups", "They encrypt image layer filesystems with AES", "2", "Multi-stage builds leave compiler SDKs in temporary stages, yielding minimal production images.");
        p.add("What is the smallest deployable computing unit in Kubernetes?", "Container", "Pod", "Node", "Deployment", "2", "A Pod is the atomic execution unit in Kubernetes, wrapping one or more containers.");
        p.add("Which Kubernetes controller ensures a specified number of Pod replicas are running across worker nodes at all times?", "DaemonSet", "ReplicaSet", "Job", "StatefulSet", "2", "A ReplicaSet maintains a stable set of running Pod replicas.");
        p.add("Which Kubernetes Service type allocates a static port on each worker node to route external traffic into Pods?", "ClusterIP", "NodePort", "Headless Service", "ExternalName", "2", "NodePort exposes the Service on each Node's IP at a static port (typically 30000-32767).");
        p.add("What is the default Kubernetes Service type accessible only from within the cluster virtual network?", "LoadBalancer", "ClusterIP", "NodePort", "Ingress", "2", "ClusterIP is the default service type that assigns an internal virtual cluster IP.");
        p.add("Which Kubernetes resource provides Layer 7 HTTP/HTTPS routing and TLS termination for cluster workloads?", "Ingress Controller / Ingress Resource", "NetworkPolicy", "ConfigMap", "Kube-proxy", "1", "Ingress manages external HTTP/S routing rules to backend Services.");
        p.add("What is the function of a Kubernetes Readiness Probe?", "Restarts the container if it crashes", "Determines if a container is ready to accept incoming network traffic", "Monitors disk read/write throughput", "Validates Dockerfile syntax", "2", "Readiness probes gate traffic delivery so uninitialized pods do not receive requests.");
        p.add("What is the function of a Kubernetes Liveness Probe?", "Allocates more memory to the Pod", "Checks if the container is running and healthy; triggers restart if probe fails", "Measures HTTP response latency", "Deploys a backup replica on another node", "2", "Liveness probes detect deadlocks and restart non-responsive containers.");
        p.add("Which Kubernetes workload object guarantees that exactly one Pod replica runs on every worker node in the cluster?", "Deployment", "DaemonSet", "StatefulSet", "CronJob", "2", "DaemonSets ensure all (or selected) worker nodes run a copy of a specific Pod (e.g. log collectors).");
        p.add("Which Kubernetes object manages workloads that require persistent identities and ordered deployment/scaling?", "StatefulSet", "Deployment", "ReplicaSet", "Job", "1", "StatefulSets provide persistent network IDs and dedicated persistent volume claims.");
        p.add("In Terraform, what file tracks the current state of managed cloud infrastructure resources?", "terraform.tfstate", "terraform.lock.hcl", "main.tf", "variables.tf", "1", "terraform.tfstate maintains the mapping between configuration code and real infrastructure.");
        p.add("Which Terraform command analyzes configuration files and previews resource changes before applying them?", "terraform init", "terraform plan", "terraform apply -auto-approve", "terraform validate", "2", "terraform plan generates an execution plan showing proposed infrastructure modifications.");
        p.add("What is the core principle of GitOps deployment workflows?", "Deploying manually via SSH terminal sessions", "Using Git as the single source of truth for declaratively managing infrastructure and application state", "Storing sensitive database passwords in public repositories", "Running tests only after production deployment", "2", "GitOps uses Git version control as the canonical declarative state for deployments.");
        p.add("Which tool is standardly used for continuous declarative GitOps delivery in Kubernetes?", "Argo CD / Flux", "Jenkins 1.0", "Puppet", "Nagios", "1", "Argo CD synchronizes cluster state with Git repositories continuously.");
        p.add("In CI/CD, what is the key difference between Continuous Delivery and Continuous Deployment?", "Continuous Delivery compiles code while Continuous Deployment does not", "Continuous Delivery requires manual approval before production deployment, while Continuous Deployment releases automatically", "Continuous Delivery does not run automated tests", "Continuous Deployment only runs on weekends", "2", "Continuous Deployment automatically promotes passing builds straight to production.");
        p.add("What metric storage architecture does Prometheus utilize to store time-series telemetry?", "Relational SQL tables", "Time-series database (TSDB)", "Document JSON collections", "Key-value Redis caches", "2", "Prometheus utilizes a custom, optimized on-disk time-series database (TSDB).");
        p.add("What query language does Prometheus use to slice, dice, and aggregate metric counters and gauges?", "SQL", "PromQL (Prometheus Query Language)", "GraphQL", "HQL", "2", "PromQL is the native functional expression query language for Prometheus.");
        p.add("In microservices observability, what three pillars form comprehensive system telemetry?", "HTML, CSS, JavaScript", "Metrics, Logs, Distributed Traces", "CPU, RAM, Disk", "Ingress, Service, Pod", "2", "Metrics, logs, and distributed traces provide complete observability.");
        p.add("Which distributed tracing framework standard has been unified under the CNCF?", "OpenTelemetry (OTel)", "Logstash", "Fluentbit", "Sensu", "1", "OpenTelemetry is the CNCF standard for generating and collecting traces and metrics.");
        p.add("What is the primary function of a Helm Chart in Kubernetes ecosystems?", "A package manager for templating and releasing Kubernetes resource manifests", "A hardware hypervisor for bare metal nodes", "A container runtime engine replacing containerd", "A network router for BGP peering", "1", "Helm is the de-facto package manager for Kubernetes YAML templates.");
        p.add("In Kubernetes networking, what component implements Service abstraction and packet forwarding on each node?", "kube-scheduler", "kube-proxy", "etcd", "cloud-controller-manager", "2", "kube-proxy maintains network rules across nodes to route Service traffic to endpoints.");
        p.add("What consistent distributed key-value store holds all cluster configuration state in Kubernetes?", "Consul", "etcd", "Zookeeper", "Redis", "2", "etcd is the distributed consensus store holding all Kubernetes cluster state.");
        p.add("Which Kubernetes control plane component assigns newly created Pods to available worker nodes?", "kube-apiserver", "kube-scheduler", "kube-controller-manager", "coredns", "2", "kube-scheduler evaluates node affinity and resources to schedule unassigned Pods.");
        p.add("What deployment strategy gradually routes a small percentage of user traffic to a new version to verify stability?", "Recreate Strategy", "Canary Deployment", "Rolling Update with maxUnavailable=100%", "Blue/Green without load balancers", "2", "Canary deployments expose a small cohort of users to new versions to test real-world behavior.");
        p.add("In Docker, what is the default network driver assigned to standalone containers?", "host", "bridge", "overlay", "macvlan", "2", "The bridge network driver is Docker's default for isolated standalone containers.");
        p.add("What does the 'Immutable Infrastructure' paradigm dictate regarding server updates?", "Servers are logged into via SSH and updated with patch scripts", "Servers are never modified in place; new updated instances are deployed and old ones destroyed", "Operating systems are locked against security updates", "Containers run without persistent disk volumes", "2", "Immutable infrastructure replaces instances entirely rather than modifying them in place.");
        p.add("Which Kubernetes resource isolates network communication between designated pods?", "Ingress", "NetworkPolicy", "SecurityContext", "ResourceQuota", "2", "NetworkPolicy enforces firewall-like traffic filtering between Pods.");
        p.add("In cloud architecture, what is the primary benefit of deploying applications across multiple Availability Zones (AZs)?", "Reduces monthly compute costs to zero", "High availability and resilience against catastrophic datacenter outages", "Accelerates code compilation speeds", "Eliminates need for database backups", "2", "Multi-AZ architectures survive isolated datacenter failures without application downtime.");
        p.add("What does the 'Circuit Breaker' pattern accomplish in distributed microservices?", "Physically shuts down server power supplies during overheating", "Fails fast and prevents cascading system crashes when a downstream service becomes unresponsive", "Encrypts inter-service gRPC calls", "Generates daily billing invoices", "2", "Circuit breakers intercept calls to failing dependencies to prevent resource exhaustion.");

        return p;
    }

    // 4. Business Analytics & Strategic Growth Leadership (BBA)
    private static SeedCoursePackage getBusinessAnalyticsPackage() {
        Course c = new Course(
                "Business Analytics & Strategic Growth Leadership",
                "business-analytics-strategic-growth",
                "BBA",
                "Executive business analytics certification evaluating quantitative KPI dashboards, customer lifetime value, market entry strategies, unit economics, and data-driven corporate leadership.",
                35, 30, 60, 1, CourseStatus.PUBLISHED
        );
        c.setSyllabus(List.of(
                "Executive KPI Dashboards & Quantitative Metrics",
                "Unit Economics (CAC, LTV, Churn, Payback)",
                "Strategic Frameworks (SWOT, Porter's 5 Forces, BCG Matrix)",
                "Agile Operations & Data-Driven Decision Making"
        ));

        SeedCoursePackage p = new SeedCoursePackage(c);
        p.add("What does the acronym 'SWOT' stand for in corporate strategic analysis?", "Sales, Wealth, Opportunities, Taxes", "Strengths, Weaknesses, Opportunities, Threats", "Systems, Workflows, Operations, Targets", "Strategy, Workforce, Output, Trade", "2", "SWOT evaluates internal Strengths & Weaknesses alongside external Opportunities & Threats.");
        p.add("Which business metric evaluates the total financial return generated by an investment relative to its initial outlay?", "EBITDA", "ROI (Return on Investment)", "Gross Margin", "Net Working Capital", "2", "ROI measures financial gain relative to invested capital.");
        p.add("Which core components constitute the traditional 'Marketing Mix' (4 Ps)?", "Product, Price, Place, Promotion", "People, Process, Profit, Product", "Plan, Produce, Position, Price", "Prospect, Pitch, Packaging, Payment", "1", "Product, Price, Place, and Promotion form the bedrock 4 Ps marketing mix.");
        p.add("What does Customer Acquisition Cost (CAC) represent in corporate unit economics?", "Total money earned per customer lifetime", "The total sales and marketing expenditure required to acquire a new paying customer", "The monthly customer support cost", "The legal cost of incorporating a company", "2", "CAC quantifies all sales and marketing costs divided by the count of new customers acquired.");
        p.add("What does Customer Lifetime Value (LTV) measure in business valuation?", "The total revenue/gross profit a company expects to realize from a customer over their entire relationship", "The age of the customer", "The duration of an employment contract", "The physical warranty period of hardware", "1", "LTV forecasts total cumulative contribution margin generated by a customer relationship.");
        p.add("In subscription business models, what constitutes a healthy LTV to CAC ratio?", "0.5 : 1", "1 : 1", "3 : 1 or higher", "0.1 : 1", "3", "An LTV:CAC ratio of 3:1 or greater signifies sustainable customer acquisition economics.");
        p.add("What does 'Churn Rate' signify in recurring revenue analytics?", "The speed of manufacturing physical products", "The percentage of subscribers who cancel or fail to renew their subscription over a specified timeframe", "The rate of hiring new sales executives", "The annual employee turnover in HR", "2", "Churn measures lost customers or revenue percentage over an accounting cycle.");
        p.add("In the Boston Consulting Group (BCG) Growth-Share Matrix, what do 'Cash Cows' represent?", "High market growth, low market share business units", "Low market growth, high market share business units that generate steady surplus cash", "High market growth, high market share business units", "Low market growth, low market share business units", "2", "Cash Cows are dominant leaders in mature, low-growth markets requiring little reinvestment.");
        p.add("In the BCG Matrix, what classification characterizes business units with high market share in high-growth industries?", "Dogs", "Question Marks", "Stars", "Cash Cows", "3", "Stars command high market share in rapidly expanding markets and require growth capital.");
        p.add("Which competitive strategy framework evaluates Suppliers, Buyers, Substitutes, New Entrants, and Industry Rivalry?", "Maslow's Hierarchy", "Porter's Five Forces", "McKinsey 7S Framework", "Ansoff Matrix", "2", "Porter's Five Forces assesses structural industry attractiveness and competitive intensity.");
        p.add("What does 'Break-Even Point' represent in managerial finance?", "The moment a company declares bankruptcy", "The sales volume at which total revenue exactly equals total costs (zero profit and zero loss)", "The point where net profit exceeds 50%", "The date when venture capital funding closes", "2", "The break-even point is where sales volume yields zero operating profit.");
        p.add("Which formula computes the Break-Even Point in units?", "Fixed Costs / (Sales Price per Unit - Variable Cost per Unit)", "Total Revenue / Variable Costs", "Fixed Costs * Profit Margin", "Total Liabilities - Cash", "1", "Fixed costs divided by contribution margin per unit gives the break-even unit volume.");
        p.add("What is the primary purpose of a Net Promoter Score (NPS) survey?", "To calculate income tax deductions", "To measure customer loyalty and likelihood to recommend a product or company", "To audit inventory turnover in warehouses", "To count daily website page impressions", "2", "NPS measures customer advocacy on an 11-point scale from Promoters to Detractors.");
        p.add("In an NPS survey, what respondents are categorized as 'Promoters'?", "Scores 0 to 6", "Scores 7 to 8", "Scores 9 to 10", "Scores 5 only", "3", "Respondents giving 9 or 10 are classified as enthusiastic Promoters.");
        p.add("What does 'EBITDA' stand for in financial accounting analysis?", "Equity Before Income, Taxes, Debt, and Amortization", "Earnings Before Interest, Taxes, Depreciation, and Amortization", "Expenses Beyond Inflation, Taxes, Dividends, and Assets", "Expected Balance in Treasury, Debt, and Accounts", "2", "EBITDA measures core operating profitability before non-cash and financing expenses.");
        p.add("In growth strategy, which Ansoff Matrix quadrant involves selling existing products into new geographical markets?", "Market Penetration", "Market Development", "Product Development", "Diversification", "2", "Market Development takes existing product portfolios into unreached markets or segments.");
        p.add("What does 'Diversification' entail in the Ansoff Matrix?", "Selling more existing products to existing customers", "Introducing completely new products into completely new markets", "Reducing marketing budgets by 50%", "Merging with a direct supplier", "2", "Diversification enters new product categories across unfamiliar consumer markets.");
        p.add("What distinguishes an 'OKR' (Objectives and Key Results) system from a generic KPI?", "OKRs focus solely on past accounting records", "Objectives set aspirational qualitative direction, while Key Results define measurable quantitative milestones", "OKRs are only used by government agencies", "OKRs cannot be modified more than once a decade", "2", "OKRs pair qualitative aspirational objectives with strictly measurable key results.");
        p.add("Which Agile project management methodology organizes work into fixed iterations called 'Sprints'?", "Waterfall", "Scrum", "Six Sigma DMAIC", "PRINCE2", "2", "Scrum delivers prioritized backlog items through structured timeboxed sprints.");
        p.add("In Agile Scrum, who is primarily accountable for maximizing product value and managing the product backlog?", "Scrum Master", "Product Owner", "Lead Software Architect", "Chief Financial Officer", "2", "The Product Owner prioritizes backlog requirements to maximize business value delivered.");
        p.add("What does 'Total Addressable Market' (TAM) represent in venture strategy?", "The total revenue of a startup last quarter", "The overall revenue opportunity available if a product achieved 100% market share of its target space", "The legal budget allocated for patent defense", "The sum of all employee salaries in a sector", "2", "TAM models the maximal annual commercial market potential for a solution.");
        p.add("What does 'SAM' stand for in market sizing methodologies?", "Serviceable Addressable Market", "Standard Accounting Method", "Systemic Asset Management", "Strategic Allocation Metric", "1", "Serviceable Addressable Market is the portion of TAM targeted by a firm's products.");
        p.add("What does a 'P&L Statement' (Profit and Loss) demonstrate over a reporting period?", "A snapshot of company assets and debts at an exact moment", "The company's revenues, costs, and resulting net income over an accounting duration", "A listing of all physical warehouse inventory", "The personal bank balances of company founders", "2", "The P&L statement displays revenues, expenses, and net profit over a fiscal interval.");
        p.add("Which financial ratio evaluates a company's ability to cover short-term debts with short-term assets?", "Debt-to-Equity Ratio", "Current Ratio (Current Assets / Current Liabilities)", "Price-to-Earnings Ratio", "Return on Equity", "2", "Current Ratio evaluates operational solvency by comparing current assets to liabilities.");
        p.add("What does the 'Quick Ratio' (Acid-Test Ratio) exclude from Current Assets?", "Cash equivalents", "Marketable securities", "Inventory", "Accounts receivable", "3", "The Quick Ratio excludes illiquid inventory to test instant liquid debt coverage.");
        p.add("In corporate supply chain management, what is the core tenet of 'Just-in-Time' (JIT) inventory?", "Stocking five years of raw materials in advance", "Receiving goods only as they are needed in the production process to minimize holding costs", "Purchasing exclusively from domestic vendors", "Selling goods without packaging", "2", "JIT synchronizes raw material intake with production schedules to minimize carrying costs.");
        p.add("What is the primary focus of Six Sigma methodology in business operations?", "Increasing marketing ad spending", "Reducing process variation and defects to 3.4 defects per million opportunities", "Writing long executive memoirs", "Promoting employees solely based on seniority", "2", "Six Sigma applies statistical controls to reduce operational defect rates.");
        p.add("In corporate governance, what is the fiduciary responsibility of the Board of Directors?", "Handling daily customer phone inquiries", "Overseeing corporate strategy and safeguarding shareholder and stakeholder interests", "Writing unit test code for applications", "Purchasing office stationary supplies", "2", "The Board exercises strategic governance and fiduciary oversight on behalf of shareholders.");
        p.add("What does the financial term 'Runway' signify for an early-stage venture?", "The physical distance between headquarters and the nearest airport", "The number of months a startup can operate before depleting its cash reserves at current burn rate", "The maximum amount of debt legally permissible", "The number of days until the product launch", "2", "Runway equals cash balance divided by net monthly cash burn.");
        p.add("In behavioral economics, what cognitive bias leads managers to persist in failing projects due to past investments?", "Confirmation Bias", "Sunk Cost Fallacy", "Anchoring Bias", "Availability Heuristic", "2", "Sunk Cost Fallacy causes actors to continue failing endeavors because resources are already spent.");
        p.add("What does a 'Balanced Scorecard' track beyond traditional financial metrics?", "Only employee attendance hours", "Customer satisfaction, Internal business processes, and Learning & Growth capabilities", "Only competitor stock prices", "Physical equipment depreciation schedules", "2", "The Balanced Scorecard balances financial, customer, internal, and organizational growth pillars.");
        p.add("What metric calculates how many times a company sells and replaces its inventory over a year?", "Inventory Turnover Ratio", "Days Sales Outstanding", "Asset Beta", "Gross Margin Return on Investment", "1", "Inventory Turnover measures how frequently inventory stock is depleted and replenished.");

        return p;
    }

    // 5. Financial Analytics, Corporate Valuation & Investment Banking (B.Com)
    private static SeedCoursePackage getFinancialAnalyticsPackage() {
        Course c = new Course(
                "Financial Analytics, Corporate Valuation & Investment Banking",
                "financial-analytics-corporate-valuation",
                "B.Com",
                "Advanced financial corporate valuation certification covering Discounted Cash Flow (DCF), WACC calculations, double-entry ledger audits, working capital, DuPont Analysis, and IFRS compliance.",
                35, 30, 60, 1, CourseStatus.PUBLISHED
        );
        c.setSyllabus(List.of(
                "Corporate Valuation Frameworks (DCF, WACC, Multiples)",
                "Financial Statement Modeling & Forensic Reconciliations",
                "Working Capital Optimization & Cash Flow Dynamics",
                "DuPont Analysis & Corporate Accounting Governance (IFRS/GAAP)"
        ));

        SeedCoursePackage p = new SeedCoursePackage(c);
        p.add("In double-entry bookkeeping, what is the foundational accounting rule for Real Accounts?", "Debit the receiver, credit the giver", "Debit what comes in, credit what goes out", "Debit all expenses, credit all incomes", "Debit capital, credit drawings", "2", "Real Accounts (tangible assets) mandate: Debit what comes into business, credit what goes out.");
        p.add("In double-entry bookkeeping, what rule applies to Nominal Accounts?", "Debit what comes in, credit what goes out", "Debit all expenses and losses, credit all incomes and gains", "Debit the giver, credit the receiver", "Debit asset, credit liability", "2", "Nominal Accounts track revenues and expenditures: Debit expenses/losses, credit incomes/gains.");
        p.add("What does 'Working Capital' quantify in corporate liquidity analysis?", "Total Assets - Total Debt", "Current Assets - Current Liabilities", "Net Income - Corporate Taxes", "Retained Earnings - Dividends", "2", "Working Capital equals Current Assets minus Current Liabilities, indicating short-term solvency.");
        p.add("Which valuation methodology estimates the intrinsic value of a firm by discounting future projected cash flows?", "Comparable Company Analysis", "Discounted Cash Flow (DCF)", "Precedent Transaction Analysis", "Asset Replacement Method", "2", "DCF values an enterprise based on the net present value of its future cash flows.");
        p.add("What discount rate is conventionally utilized to discount Free Cash Flow to Firm (FCFF) in a DCF model?", "Cost of Debt only", "Weighted Average Cost of Capital (WACC)", "Risk-Free Rate only", "Prime Lending Rate", "2", "FCFF represents cash available to all capital providers, so it is discounted at WACC.");
        p.add("In the Capital Asset Pricing Model (CAPM), what formula estimates the Cost of Equity (Ke)?", "Rf + Beta * (Rm - Rf)", "Rf * Beta + Rm", "(Rm - Rf) / Beta", "Net Income / Total Equity", "1", "CAPM computes Ke as Risk-Free Rate + Beta * Equity Risk Premium (Rm - Rf).");
        p.add("What does 'Beta' represent in corporate financial modeling?", "The dividend yield of a corporate stock", "The volatility/systematic risk of a security relative to the broader market", "The tax rate applied to foreign earnings", "The inflation rate in a country", "2", "Beta measures an asset's covariance and systematic sensitivity against market movements.");
        p.add("What does Free Cash Flow to Firm (FCFF) represent?", "Net Income plus dividends", "Cash generated by operations minus capital expenditures, available to debt and equity holders", "Revenue minus Cost of Goods Sold only", "Total cash balance held in bank accounts", "2", "FCFF is operating cash flow minus Capex, representing cash distributable to all capital sources.");
        p.add("In financial statement analysis, which equation forms the fundamental Balance Sheet identity?", "Assets = Liabilities + Equity", "Assets = Liabilities - Equity", "Equity = Assets + Liabilities", "Liabilities = Assets * Equity", "1", "The fundamental accounting equation states Assets must equal Liabilities plus Shareholder Equity.");
        p.add("What financial ratio breaks Return on Equity (ROE) into Profit Margin, Asset Turnover, and Financial Leverage?", "Altman Z-Score", "DuPont Analysis", "Sharpe Ratio", "Treynor Ratio", "2", "The DuPont Framework decomposes ROE into operational, efficiency, and leverage drivers.");
        p.add("Which depreciation method applies a constant percentage reduction to the reducing asset book value each fiscal year?", "Straight-Line Method", "Written Down Value (WDV) / Reducing Balance Method", "Sum of Years Digits", "Units of Production", "2", "WDV applies a fixed depreciation rate on the opening book balance each fiscal year.");
        p.add("Under the Straight-Line depreciation method, how is annual depreciation calculated?", "(Asset Cost - Salvage Value) / Useful Economic Life in Years", "Asset Cost * Tax Rate", "Salvage Value / Years of Service", "Asset Cost * Inflation Index", "1", "Straight-Line depreciation evenly spreads depreciable cost across the asset's economic lifespan.");
        p.add("What does the 'Price-to-Earnings' (P/E) ratio compare?", "Stock price relative to company book value", "Market price per share relative to earnings per share (EPS)", "Total debt relative to net income", "Enterprise value relative to sales", "2", "The P/E ratio gauges what the market is willing to pay today per rupee/dollar of corporate earnings.");
        p.add("What does Enterprise Value (EV) measure in corporate mergers and acquisitions?", "Market capitalization only", "Equity Value + Total Debt + Preferred Stock + Minority Interest - Cash & Cash Equivalents", "Total annual gross sales", "Total tax paid over 5 years", "2", "EV captures the total theoretical takeover cost of a business including debt net of cash.");
        p.add("What financial metric divides Net Credit Sales by Average Accounts Receivable to evaluate collection efficiency?", "Inventory Turnover Ratio", "Accounts Receivable Turnover Ratio", "Current Ratio", "Operating Margin", "2", "Receivables Turnover evaluates how efficiently a firm manages credit and collects outstanding debts.");
        p.add("What does 'Days Sales Outstanding' (DSO) measure in working capital analytics?", "Number of days products stay in warehouse", "Average number of days it takes for a company to collect payment after a credit sale has been made", "Number of days until accounts payable are due", "The company's fiscal year duration", "2", "DSO measures the average collection period of trade receivables.");
        p.add("In accounting terminology, what is 'Goodwill'?", "The annual budget spent on charity programs", "An intangible asset recorded when a company acquires another for more than the fair market value of net identifiable assets", "The bonus paid to corporate executives", "Cash held in emergency contingency funds", "2", "Goodwill represents purchase price premium over fair value of identifiable net assets acquired.");
        p.add("What is the primary difference between Operating Leases and Finance Leases under IFRS 16?", "Operating leases are not recorded in financial statements", "Under IFRS 16, nearly all leases must be recognized on the balance sheet as Right-of-Use (ROU) assets and lease liabilities", "Finance leases do not carry interest charges", "Leases cannot exceed 6 months under IFRS", "2", "IFRS 16 eliminated off-balance-sheet operating leases, requiring ROU asset and liability recognition.");
        p.add("What does 'Accrual Accounting' mandate regarding the recognition of revenues and expenses?", "Transactions are recorded only when physical cash changes hands", "Revenues are recognized when earned and expenses when incurred, regardless of cash movement", "Expenses are deducted only at the end of the calendar year", "Revenues can only be recorded after tax audits", "2", "Accrual accounting matches revenue with incurred costs in the applicable accounting period.");
        p.add("What does the 'Quick Ratio' measure in terms of corporate solvency?", "A firm's ability to settle short-term obligations immediately with highly liquid current assets", "How fast inventory sells out in stores", "The speed of issuing common stock", "The rate of company revenue growth", "1", "Quick Ratio tests immediate liquidity without relying on inventory liquidations.");
        p.add("In financial statement forensics, what red flag might indicate aggressive revenue recognition?", "Receivables growing significantly faster than revenue over consecutive quarters", "Inventory declining while sales increase", "Cash flows from operations matching net income", "Consistent gross margins over 5 years", "1", "When receivables surge far ahead of revenues, uncollected unearned billings may be inflated.");
        p.add("What does 'WACC' stand for in corporate finance?", "Worldwide Accounting Corporate Committee", "Weighted Average Cost of Capital", "Working Asset Collateral Cost", "Weekly Allocated Cost of Commerce", "2", "WACC calculates the blended cost of financing capital across debt and equity.");
        p.add("Why is the Cost of Debt multiplied by (1 - Tax Rate) when calculating WACC?", "Debt interest is illegal in corporate finance", "Interest expenses on corporate debt are tax-deductible, creating an interest tax shield", "To account for foreign currency exchange losses", "Banks charge an automatic 30% penalty", "2", "Interest tax-deductibility lowers the effective cost of corporate debt financing.");
        p.add("What does 'Terminal Value' represent in a multi-stage DCF valuation model?", "The value of a firm if it terminates operations today", "The anticipated present value of all cash flows beyond the explicit multi-year forecast horizon", "The legal bankruptcy costs of an enterprise", "The final payment made to retire a bond", "2", "Terminal Value accounts for enterprise value continuing into perpetuity beyond explicit forecast years.");
        p.add("Which formula computes Terminal Value using the Gordon Growth Model?", "Cash Flow in final year * (1 + g) / (WACC - g)", "Cash Flow / WACC", "Net Income * P/E Ratio", "Terminal Assets - Terminal Liabilities", "1", "Gordon Growth discounts normalized perpetual cash flows at the spread between WACC and long-term growth (g).");
        p.add("What does the 'Debt Service Coverage Ratio' (DSCR) evaluate in commercial loan underwriting?", "Whether firm operating income (Net Operating Income) is sufficient to cover annual debt principal and interest obligations", "The percentage of employees holding debt", "The market price of corporate bonds", "The dividend yield paid to equity holders", "1", "DSCR measures an enterprise's cash flow capacity to service annual debt debt obligations.");
        p.add("What does a DSCR below 1.0 indicate to an investment banker or lender?", "The firm generates ample surplus cash to pay loans", "The firm's operating income is insufficient to cover required debt payments without drawing reserves", "The firm has no outstanding debt", "The firm is guaranteed an AAA credit rating", "2", "A DSCR < 1.0 indicates negative cash flow coverage, posing high default risk.");
        p.add("In corporate capital budgeting, what does Net Present Value (NPV) represent?", "The total undiscounted sum of all future revenues", "The sum of present values of incoming cash flows minus the present value of initial cash outlays", "The accounting book value of fixed machinery", "The future price of company stock", "2", "NPV calculates value added by discounting all project inflows and outflows at the hurdle rate.");
        p.add("What decision rule governs project selection using the Internal Rate of Return (IRR)?", "Accept the project if IRR is below the risk-free rate", "Accept the project if IRR exceeds the firm's required hurdle rate / Cost of Capital", "Reject all projects with positive IRR", "Accept only projects with IRR equal to inflation", "2", "An investment adds shareholder value when its IRR exceeds the hurdle rate.");
        p.add("What is the primary objective of a 'Three-Statement Financial Model' in corporate valuation?", "To simulate tax evasion strategies", "Dynamically linking Income Statement, Balance Sheet, and Cash Flow Statement to forecast financial performance", "To eliminate the need for accounting audits", "To track daily employee timesheets", "2", "Three-statement models link P&L, balance sheet, and cash flow dynamically via circular balance loops.");
        p.add("In cash flow modeling, what adjustment is made to Depreciation and Amortization in the Cash Flow from Operations section?", "D&A is subtracted from Net Income because it represents cash lost", "D&A is added back to Net Income because it is a non-cash expense", "D&A is ignored entirely in cash flow statements", "D&A is multiplied by the corporate tax rate", "2", "D&A was deducted on the P&L without actual cash outflow, so it is added back to reconcile operating cash.");
        p.add("What does 'Operating Leverage' measure in corporate cost structure analysis?", "The proportion of fixed costs versus variable costs in a firm's operational structure", "The amount of bank loans borrowed by the CEO", "The speed of inventory restocking", "The percentage of sales made online", "1", "High operating leverage indicates a high proportion of fixed costs, causing profits to swing sharply with sales.");

        return p;
    }

    // 6. Web Development Fundamentals (BCA Track - 10 Basic Questions)
    private static SeedCoursePackage getBcaWebDevelopmentPackage() {
        Course c = new Course(
                "Web Development Fundamentals",
                "web-development-fundamentals",
                "BCA",
                "Foundational full stack web development certification evaluating essential HTML5 structure, semantic markup, CSS3 styling, responsive layouts, and core JavaScript DOM manipulation.",
                15, 10, 60, 1, CourseStatus.PUBLISHED
        );
        c.setSyllabus(List.of(
                "HTML5 Document Anatomy & Semantic Tags",
                "CSS3 Styling, Box Model & Flexbox",
                "JavaScript Variables, Functions & Logic",
                "Browser DOM Manipulation & Event Handling"
        ));

        SeedCoursePackage p = new SeedCoursePackage(c);
        p.add("What does HTML stand for in web development?", 
              "HyperText Markup Language", 
              "HighText Machine Language", 
              "HyperTransfer Markup Language", 
              "Home Tool Markup Language", 
              "1", 
              "HTML stands for HyperText Markup Language, the standard markup language for documents designed to be displayed in a web browser.");

        p.add("Which HTML tag is used to define the most important, largest heading?", 
              "<heading>", 
              "<h6>", 
              "<h1>", 
              "<head>", 
              "3", 
              "<h1> defines the most important and largest top-level heading on an HTML web page.");

        p.add("What does CSS stand for in web design?", 
              "Computer Style Sheets", 
              "Cascading Style Sheets", 
              "Creative Style Systems", 
              "Colorful Style Sheets", 
              "2", 
              "CSS stands for Cascading Style Sheets, used to format and style the layout of web pages.");

        p.add("Which CSS property is used to change the text color of an element?", 
              "font-color", 
              "text-color", 
              "color", 
              "background-color", 
              "3", 
              "The 'color' property in CSS specifies the foreground color of text content.");

        p.add("Which HTML tag is used to insert an image into a web page?", 
              "<picture>", 
              "<img>", 
              "<image>", 
              "<src>", 
              "2", 
              "The <img> tag is used to embed an image in an HTML document, utilizing the 'src' attribute for the image file path.");

        p.add("Which HTML tag is used to create a hyperlink to another web page?", 
              "<link>", 
              "<a>", 
              "<href>", 
              "<navigate>", 
              "2", 
              "The <a> (anchor) tag defines a hyperlink that links one page or resource to another.");

        p.add("Which keyword is NOT a valid way to declare a variable in modern JavaScript?", 
              "var", 
              "let", 
              "const", 
              "dim", 
              "4", 
              "'dim' is used in languages like Visual Basic. JavaScript uses 'var', 'let', and 'const' for variable declarations.");

        p.add("Which CSS display property arranges elements in a flexible, one-dimensional layout?", 
              "display: flex", 
              "display: block", 
              "display: inline", 
              "display: none", 
              "1", 
              "Flexbox (display: flex) provides an efficient way to lay out, align, and distribute space among items in a container.");

        p.add("Which method is used to write output or debug messages to the browser developer console in JavaScript?", 
              "console.log()", 
              "print()", 
              "document.write()", 
              "alert.log()", 
              "1", 
              "console.log() writes informational or debug messages directly to the browser's developer console.");

        p.add("Which HTML tag is used to create an unordered (bulleted) list?", 
              "<ol>", 
              "<dl>", 
              "<ul>", 
              "<li>", 
              "3", 
              "The <ul> tag defines an unordered (bulleted) list, while <li> defines individual list items.");

        return p;
    }
}
