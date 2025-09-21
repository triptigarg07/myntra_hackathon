# Myntra Family Room - System Architecture

## High Level System Design

```mermaid
graph TB
    %% Client Layer
    subgraph "Client Layer"
        WEB[Web App - React/TypeScript]
        MOB[Mobile App - React Native]
        PWA[PWA - Progressive Web App]
    end

    %% API Gateway & Load Balancer
    subgraph "Gateway Layer"
        LB[Load Balancer - Nginx]
        AG[API Gateway - Kong/AWS API Gateway]
        CDN[CDN - CloudFront/Cloudflare]
    end

    %% Microservices Layer
    subgraph "Microservices Architecture"
        subgraph "Core Services"
            US[User Service<br/>Authentication & Profiles]
            RS[Room Service<br/>Room Management]
            PS[Product Service<br/>Catalog & Search]
            AS[Activity Service<br/>Real-time Activities]
        end
        
        subgraph "Business Services"
            AI[AI Service<br/>Recommendations & Trip Planning]
            NS[Notification Service<br/>Email/SMS/Push]
            PayS[Payment Service<br/>Transactions]
            SS[Search Service<br/>Elasticsearch]
        end
        
        subgraph "Integration Services"
            MS[Myntra Integration<br/>Product Sync]
            ES[External Services<br/>Payment/Email/SMS]
        end
    end

    %% Real-time Layer
    subgraph "Real-time Communication"
        WS[WebSocket Server<br/>Socket.io]
        RTC[WebRTC Signaling<br/>Video Chat]
    end

    %% Data Layer
    subgraph "Data Layer"
        subgraph "Primary Storage"
            PG[(PostgreSQL<br/>Main Database)]
            MONGO[(MongoDB<br/>Activity Logs)]
        end
        
        subgraph "Cache & Search"
            REDIS[(Redis<br/>Cache & Sessions)]
            ES_DB[(Elasticsearch<br/>Product Search)]
        end
        
        subgraph "File Storage"
            S3[(AWS S3<br/>Images & Files)]
        end
    end

    %% External Services
    subgraph "External APIs"
        MYNTRA[Myntra API<br/>Product Catalog]
        PAYMENT[Payment Gateway<br/>Razorpay/Stripe]
        EMAIL[Email Service<br/>SendGrid]
        SMS[SMS Service<br/>Twilio]
        OPENAI[OpenAI API<br/>AI Recommendations]
    end

    %% Monitoring & Analytics
    subgraph "Monitoring"
        LOGS[Logging<br/>Winston/ELK Stack]
        METRICS[Metrics<br/>Prometheus/Grafana]
        ERROR[Error Tracking<br/>Sentry]
    end

    %% Connections
    WEB --> CDN
    MOB --> CDN
    PWA --> CDN
    
    CDN --> LB
    LB --> AG
    
    AG --> US
    AG --> RS
    AG --> PS
    AG --> AS
    AG --> AI
    AG --> NS
    AG --> PayS
    
    WEB -.-> WS
    MOB -.-> WS
    PWA -.-> WS
    
    US --> PG
    US --> REDIS
    
    RS --> PG
    RS --> REDIS
    RS --> WS
    
    PS --> PG
    PS --> ES_DB
    PS --> REDIS
    PS --> MS
    
    AS --> MONGO
    AS --> REDIS
    AS --> WS
    
    AI --> OPENAI
    AI --> PG
    AI --> REDIS
    
    NS --> EMAIL
    NS --> SMS
    NS --> REDIS
    
    PayS --> PAYMENT
    PayS --> PG
    
    SS --> ES_DB
    
    MS --> MYNTRA
    ES --> PAYMENT
    ES --> EMAIL
    ES --> SMS
    
    %% File uploads
    WEB -.-> S3
    MOB -.-> S3
    
    %% Monitoring connections
    US -.-> LOGS
    RS -.-> LOGS
    PS -.-> LOGS
    AS -.-> LOGS
    
    US -.-> METRICS
    RS -.-> METRICS
    PS -.-> METRICS
    AS -.-> METRICS
    
    US -.-> ERROR
    RS -.-> ERROR
    PS -.-> ERROR
    AS -.-> ERROR

    %% Styling
    classDef client fill:#e1f5fe
    classDef gateway fill:#f3e5f5
    classDef service fill:#e8f5e8
    classDef data fill:#fff3e0
    classDef external fill:#ffebee
    classDef monitoring fill:#f1f8e9
    
    class WEB,MOB,PWA client
    class LB,AG,CDN gateway
    class US,RS,PS,AS,AI,NS,PayS,SS,MS,ES,WS,RTC service
    class PG,MONGO,REDIS,ES_DB,S3 data
    class MYNTRA,PAYMENT,EMAIL,SMS,OPENAI external
    class LOGS,METRICS,ERROR monitoring
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as User (Web/Mobile)
    participant AG as API Gateway
    participant RS as Room Service
    participant AS as Activity Service
    participant PS as Product Service
    participant WS as WebSocket Server
    participant AI as AI Service
    participant DB as Database
    participant Cache as Redis Cache

    %% User joins room
    U->>AG: Join Room Request
    AG->>RS: Validate & Join Room
    RS->>DB: Update Room Members
    RS->>Cache: Cache User Session
    RS->>WS: Notify Room Members
    WS-->>U: Real-time Room Update

    %% User views product
    U->>AG: View Product
    AG->>PS: Get Product Details
    PS->>Cache: Check Cache
    alt Cache Hit
        Cache-->>PS: Return Cached Data
    else Cache Miss
        PS->>DB: Query Product
        DB-->>PS: Product Data
        PS->>Cache: Update Cache
    end
    PS-->>AG: Product Details
    AG-->>U: Product Response

    %% Log activity
    AG->>AS: Log Activity
    AS->>DB: Store Activity
    AS->>WS: Broadcast Activity
    WS-->>U: Real-time Activity Update

    %% Generate recommendations
    AS->>AI: Trigger Recommendation
    AI->>DB: Analyze User Patterns
    AI->>Cache: Get Cached Preferences
    AI-->>AS: AI Recommendations
    AS->>WS: Send Recommendations
    WS-->>U: Real-time Recommendations
```

## Component Architecture (Frontend)

```mermaid
graph TD
    subgraph "React Application"
        APP[App Component<br/>Router & Global State]
        
        subgraph "Pages"
            LP[Landing Page]
            RP[Room Page]
        end
        
        subgraph "Core Components"
            RH[Room Header<br/>Members & Controls]
            PG[Product Grid<br/>Product Catalog]
            AF[Activity Feed<br/>Real-time Updates]
            RC[Recommendations<br/>AI Suggestions]
            TP[Trip Planner<br/>AI Assistant]
        end
        
        subgraph "UI Components"
            PC[Product Card]
            AV[Avatar]
            BTN[Button]
            CARD[Card]
            MODAL[Modal]
        end
        
        subgraph "Context & State"
            AC[App Context<br/>Global State]
            WS_CLIENT[WebSocket Client<br/>Real-time Connection]
        end
        
        subgraph "Utils & Services"
            API[API Client<br/>HTTP Requests]
            MOCK[Mock Data<br/>Development]
        end
    end

    APP --> LP
    APP --> RP
    APP --> AC
    
    RP --> RH
    RP --> PG
    RP --> AF
    RP --> RC
    RP --> TP
    
    PG --> PC
    RH --> AV
    AF --> AV
    
    PC --> BTN
    PC --> CARD
    
    AC --> WS_CLIENT
    AC --> API
    AC --> MOCK
    
    WS_CLIENT -.-> AF
    WS_CLIENT -.-> RC
    WS_CLIENT -.-> RH

    classDef page fill:#e3f2fd
    classDef component fill:#e8f5e8
    classDef ui fill:#fff3e0
    classDef state fill:#f3e5f5
    classDef service fill:#ffebee
    
    class LP,RP page
    class RH,PG,AF,RC,TP component
    class PC,AV,BTN,CARD,MODAL ui
    class AC,WS_CLIENT state
    class API,MOCK service
```

## Database Schema Overview

```mermaid
erDiagram
    USERS {
        uuid id PK
        string name
        string email
        string avatar
        string myntra_id
        timestamp created_at
        timestamp updated_at
    }
    
    ROOMS {
        uuid id PK
        string name
        uuid owner_id FK
        enum visibility
        string invite_code
        timestamp created_at
        timestamp updated_at
    }
    
    ROOM_MEMBERS {
        uuid id PK
        uuid room_id FK
        uuid user_id FK
        enum role
        boolean is_online
        timestamp joined_at
        timestamp last_seen
    }
    
    PRODUCTS {
        uuid id PK
        string sku
        string title
        string brand
        string category
        decimal price
        decimal original_price
        json images
        text description
        float rating
        integer reviews
        json metadata
        timestamp created_at
        timestamp updated_at
    }
    
    ROOM_ACTIVITIES {
        uuid id PK
        uuid room_id FK
        uuid user_id FK
        uuid product_id FK
        enum action_type
        text message
        boolean is_secret
        json metadata
        timestamp created_at
    }
    
    RECOMMENDATIONS {
        uuid id PK
        uuid room_id FK
        enum type
        json product_ids
        string reason
        uuid triggered_by FK
        timestamp created_at
        timestamp expires_at
    }
    
    TRIP_PLANS {
        uuid id PK
        uuid room_id FK
        string destination
        string trip_type
        integer duration
        string climate
        integer travelers
        string occasion
        json packing_list
        timestamp created_at
        timestamp updated_at
    }

    USERS ||--o{ ROOMS : owns
    USERS ||--o{ ROOM_MEMBERS : belongs_to
    ROOMS ||--o{ ROOM_MEMBERS : has
    ROOMS ||--o{ ROOM_ACTIVITIES : contains
    ROOMS ||--o{ RECOMMENDATIONS : receives
    ROOMS ||--o{ TRIP_PLANS : plans
    USERS ||--o{ ROOM_ACTIVITIES : performs
    PRODUCTS ||--o{ ROOM_ACTIVITIES : involves
    USERS ||--o{ RECOMMENDATIONS : triggers
```

## Security Architecture

```mermaid
graph TB
    subgraph "Security Layers"
        subgraph "Network Security"
            WAF[Web Application Firewall]
            DDoS[DDoS Protection]
            SSL[SSL/TLS Encryption]
        end
        
        subgraph "Authentication & Authorization"
            JWT[JWT Tokens]
            OAUTH[OAuth 2.0]
            RBAC[Role-Based Access Control]
            MFA[Multi-Factor Authentication]
        end
        
        subgraph "Data Security"
            ENCRYPT[Data Encryption at Rest]
            HASH[Password Hashing - bcrypt]
            SANITIZE[Input Sanitization]
            VALIDATE[Data Validation]
        end
        
        subgraph "API Security"
            RATE[Rate Limiting]
            CORS[CORS Configuration]
            HELMET[Security Headers]
            AUDIT[API Audit Logs]
        end
        
        subgraph "Infrastructure Security"
            VPC[Virtual Private Cloud]
            IAM[Identity Access Management]
            SECRETS[Secrets Management]
            BACKUP[Encrypted Backups]
        end
    end

    classDef security fill:#ffcdd2
    class WAF,DDoS,SSL,JWT,OAUTH,RBAC,MFA,ENCRYPT,HASH,SANITIZE,VALIDATE,RATE,CORS,HELMET,AUDIT,VPC,IAM,SECRETS,BACKUP security
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        subgraph "Kubernetes Cluster"
            subgraph "Frontend Pods"
                WEB_POD1[Web App Pod 1]
                WEB_POD2[Web App Pod 2]
                WEB_POD3[Web App Pod 3]
            end
            
            subgraph "Backend Pods"
                API_POD1[API Server Pod 1]
                API_POD2[API Server Pod 2]
                WS_POD1[WebSocket Pod 1]
                WS_POD2[WebSocket Pod 2]
            end
            
            subgraph "Services"
                WEB_SVC[Web Service]
                API_SVC[API Service]
                WS_SVC[WebSocket Service]
            end
        end
        
        subgraph "Managed Services"
            RDS[AWS RDS - PostgreSQL]
            ELASTICACHE[AWS ElastiCache - Redis]
            ES_SERVICE[AWS Elasticsearch]
            S3_BUCKET[AWS S3 - File Storage]
        end
        
        subgraph "Monitoring Stack"
            PROMETHEUS[Prometheus]
            GRAFANA[Grafana]
            ELK[ELK Stack]
        end
    end
    
    subgraph "CI/CD Pipeline"
        GIT[Git Repository]
        ACTIONS[GitHub Actions]
        DOCKER[Docker Registry]
        DEPLOY[Deployment Scripts]
    end
    
    GIT --> ACTIONS
    ACTIONS --> DOCKER
    DOCKER --> WEB_POD1
    DOCKER --> API_POD1
    
    WEB_SVC --> WEB_POD1
    WEB_SVC --> WEB_POD2
    WEB_SVC --> WEB_POD3
    
    API_SVC --> API_POD1
    API_SVC --> API_POD2
    
    WS_SVC --> WS_POD1
    WS_SVC --> WS_POD2
    
    API_POD1 --> RDS
    API_POD1 --> ELASTICACHE
    API_POD1 --> ES_SERVICE
    API_POD1 --> S3_BUCKET
    
    API_POD1 -.-> PROMETHEUS
    WS_POD1 -.-> PROMETHEUS
    PROMETHEUS --> GRAFANA

    classDef pod fill:#e8f5e8
    classDef service fill:#e3f2fd
    classDef managed fill:#fff3e0
    classDef cicd fill:#f3e5f5
    
    class WEB_POD1,WEB_POD2,WEB_POD3,API_POD1,API_POD2,WS_POD1,WS_POD2 pod
    class WEB_SVC,API_SVC,WS_SVC service
    class RDS,ELASTICACHE,ES_SERVICE,S3_BUCKET,PROMETHEUS,GRAFANA,ELK managed
    class GIT,ACTIONS,DOCKER,DEPLOY cicd
```

## Key Features & Data Flow

### 1. Real-time Collaboration
- WebSocket connections for instant updates
- Activity broadcasting to all room members
- Online/offline status tracking
- Synchronized product viewing

### 2. AI-Powered Recommendations
- Machine learning based on user behavior
- Trip-specific product suggestions
- Collaborative filtering within family groups
- Smart packing list generation

### 3. Secret Mode
- Hidden activity tracking
- Private gift shopping
- Selective visibility controls
- Surprise element preservation

### 4. Scalability Features
- Microservices architecture
- Horizontal pod autoscaling
- Database sharding capabilities
- CDN for global content delivery

### 5. Security Measures
- End-to-end encryption for sensitive data
- JWT-based authentication
- Rate limiting and DDoS protection
- Comprehensive audit logging

This architecture supports high availability, scalability, and real-time collaboration while maintaining security and performance standards suitable for a production e-commerce platform.
