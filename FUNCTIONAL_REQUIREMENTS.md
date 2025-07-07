# Online Survey MCQ Test Platform - Detailed Functional Requirements

## 1. USER MANAGEMENT & AUTHENTICATION

### 1.1 User Roles & Hierarchy
- **Admin**: System administrator with full access
- **Zonal Officer (ZO)**: Manages multiple Regional Officers
- **Regional Officer (RO)**: Manages multiple Supervisors
- **Supervisor**: Manages multiple Enumerators
- **Enumerator**: End user who takes tests

### 1.2 Authentication Features
- Secure login with username/password
- Role-based access control (RBAC)
- Session management with auto-logout
- Password reset functionality
- Multi-device login prevention for enumerators during tests

### 1.3 User Profile Management
- Profile creation and editing
- Jurisdiction assignment (ZO->RO->Supervisor->Enumerator)
- User status management (Active/Inactive/Suspended)
- Bulk user import/export functionality

## 2. SURVEY & QUESTION MANAGEMENT

### 2.1 Survey Configuration
- Survey creation with metadata (name, description, duration)
- Target date setting for test attempts
- Survey activation/deactivation
- Survey-specific question pool assignment
- Passing criteria configuration (percentage/marks)

### 2.2 Question Bank Management
- Question upload via CSV/Excel import
- Manual question entry interface
- Question categorization by:
  - Section (Section A, B, C)
  - Complexity Level (Easy, Medium, Hard)
  - Topic/Subject area
- Question validation and preview
- Question versioning and audit trail

### 2.3 Question Structure
- Multiple choice questions with 4 options
- Single correct answer marking
- Question metadata:
  - Marks allocation
  - Time weight
  - Explanation/rationale
  - Reference materials

### 2.4 Section-wise Configuration
- Configurable number of questions per section
- Section-wise time allocation
- Section completion requirements
- Section passing criteria

## 3. TEST EXECUTION ENGINE

### 3.1 Test Session Management
- Random question selection from pool
- Session initialization with user verification
- Test state persistence (current question, answers, time)
- Session security (prevent multiple tabs/windows)

### 3.2 Timer Management
- 35-minute countdown timer for 30 questions
- Auto-pause on network disconnection
- Timer resume on reconnection
- Grace period for technical issues
- Auto-submission on timer expiry

### 3.3 Network Interruption Handling
- Automatic progress saving every 30 seconds
- Connection status monitoring
- Resume from last saved position
- Offline answer caching (when possible)
- Conflict resolution on reconnection

### 3.4 Test Navigation
- Question-by-question navigation
- Mark for review functionality
- Answer modification before submission
- Progress indicator showing completed/remaining questions
- Section-wise progress tracking

## 4. ASSESSMENT & SCORING

### 4.1 Scoring Algorithm
- Configurable marking scheme (positive/negative marks)
- Section-wise score calculation
- Overall percentage calculation
- Complexity-weighted scoring option
- Time-based bonus points (optional)

### 4.2 Result Generation
- Immediate result display after submission
- Detailed score breakdown by section
- Performance analytics (time per question, accuracy)
- Pass/fail determination based on criteria
- Result history maintenance

### 4.3 Certificate Generation
- Automated PDF certificate creation
- Template-based certificate design
- Digital signature integration
- Certificate verification system
- Bulk certificate download for supervisors

## 5. RE-ATTEMPT MANAGEMENT

### 5.1 Attempt Tracking
- Maximum 3 attempts per survey
- Cooling period between attempts (configurable)
- Attempt history with scores
- Best score tracking
- Lockout after maximum attempts

### 5.2 Re-attempt Configuration
- Admin-configurable attempt limits
- Different question sets for each attempt
- Time interval enforcement between attempts
- Supervisor override for additional attempts

## 6. REPORTING & ANALYTICS

### 6.1 Individual Reports
- Enumerator performance reports
- Attempt-wise detailed analysis
- Weakness identification by section/topic
- Time management analysis
- Progress tracking over multiple attempts

### 6.2 Jurisdiction-based Reporting
- Hierarchical result viewing (ZO->RO->Supervisor->Enumerator)
- Aggregate statistics by jurisdiction
- Pass/fail rates analysis
- Performance benchmarking
- Export functionality (PDF, Excel)

### 6.3 Administrative Reports
- Survey completion statistics
- Question difficulty analysis
- System usage analytics
- Performance trends over time
- Certificate issuance reports

## 7. CAPI INTEGRATION

### 7.1 API Endpoints
- Test status check API for CAPI application
- User authentication verification
- Survey assignment status
- Result verification API
- Certificate validation API

### 7.2 Offline Sync Requirements
- Test completion status sync
- Result data sync
- Certificate status update
- User profile sync
- Survey assignment sync

## 8. SYSTEM ADMINISTRATION

### 8.1 System Configuration
- Global settings management
- Test duration configuration
- Scoring parameters setup
- Security settings
- Email/SMS notification setup

### 8.2 Monitoring & Maintenance
- System health monitoring
- User activity tracking
- Performance metrics
- Backup and recovery procedures
- Data archival policies

### 8.3 Security Features
- Role-based access control
- Audit trail for all actions
- Data encryption at rest and transit
- Session security
- Anti-cheating measures

## 9. NOTIFICATION SYSTEM

### 9.1 Automated Notifications
- Test assignment notifications
- Deadline reminders
- Result notifications
- Certificate availability alerts
- System maintenance notifications

### 9.2 Communication Channels
- Email notifications
- SMS alerts (optional)
- In-app notifications
- Dashboard announcements

## 10. DATA MANAGEMENT

### 10.1 Data Backup & Recovery
- Automated daily backups
- Point-in-time recovery
- Data export functionality
- Archive old test data
- Disaster recovery procedures

### 10.2 Performance Optimization
- Database indexing strategy
- Query optimization
- Caching implementation
- Load balancing considerations
- Scalability planning

## 11. COMPLIANCE & AUDIT

### 11.1 Audit Requirements
- Complete audit trail of all user actions
- Test session logging
- Question access logging
- Result modification tracking
- System access logging

### 11.2 Data Privacy
- Personal data protection
- Result confidentiality
- Access control enforcement
- Data retention policies
- Right to data deletion