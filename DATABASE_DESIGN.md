# Database Design - Online Survey MCQ Test Platform

## Database Schema

### 1. USER MANAGEMENT TABLES

```sql
-- Users table with role-based hierarchy
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'zo', 'ro', 'supervisor', 'enumerator')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    parent_user_id UUID REFERENCES users(id),
    jurisdiction_code VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    created_by UUID REFERENCES users(id)
);

-- User sessions for tracking active sessions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    is_active BOOLEAN DEFAULT true
);
```

### 2. SURVEY MANAGEMENT TABLES

```sql
-- Surveys configuration
CREATE TABLE surveys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 35,
    total_questions INTEGER NOT NULL DEFAULT 30,
    passing_percentage DECIMAL(5,2) NOT NULL DEFAULT 60.00,
    max_attempts INTEGER DEFAULT 3,
    target_start_date DATE,
    target_end_date DATE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'archived')),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Question sections configuration
CREATE TABLE question_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    survey_id UUID NOT NULL REFERENCES surveys(id),
    section_name VARCHAR(50) NOT NULL,
    section_order INTEGER NOT NULL,
    questions_count INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Question bank
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    survey_id UUID NOT NULL REFERENCES surveys(id),
    section_id UUID NOT NULL REFERENCES question_sections(id),
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    complexity VARCHAR(20) NOT NULL CHECK (complexity IN ('easy', 'medium', 'hard')),
    marks DECIMAL(5,2) DEFAULT 1.00,
    explanation TEXT,
    topic VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. TEST EXECUTION TABLES

```sql
-- Test sessions
CREATE TABLE test_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    survey_id UUID NOT NULL REFERENCES surveys(id),
    attempt_number INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(20) DEFAULT 'started' CHECK (status IN ('started', 'paused', 'completed', 'expired', 'abandoned')),
    start_time TIMESTAMPTZ DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    pause_time TIMESTAMPTZ,
    resume_time TIMESTAMPTZ,
    total_pause_duration INTERVAL DEFAULT '0 seconds',
    current_question_index INTEGER DEFAULT 0,
    total_questions INTEGER,
    submitted_at TIMESTAMPTZ,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Session questions (randomized question set for each session)
CREATE TABLE session_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES test_sessions(id),
    question_id UUID NOT NULL REFERENCES questions(id),
    question_order INTEGER NOT NULL,
    is_attempted BOOLEAN DEFAULT false,
    selected_answer CHAR(1) CHECK (selected_answer IN ('A', 'B', 'C', 'D')),
    is_marked_for_review BOOLEAN DEFAULT false,
    time_spent INTERVAL DEFAULT '0 seconds',
    answered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Session state for network interruption recovery
CREATE TABLE session_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES test_sessions(id),
    state_data JSONB NOT NULL,
    saved_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. RESULTS AND SCORING TABLES

```sql
-- Test results
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES test_sessions(id),
    user_id UUID NOT NULL REFERENCES users(id),
    survey_id UUID NOT NULL REFERENCES surveys(id),
    attempt_number INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    attempted_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    total_marks DECIMAL(8,2) NOT NULL,
    obtained_marks DECIMAL(8,2) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    pass_status BOOLEAN NOT NULL,
    time_taken INTERVAL NOT NULL,
    section_wise_scores JSONB,
    complexity_wise_scores JSONB,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    result_id UUID NOT NULL REFERENCES test_results(id),
    user_id UUID NOT NULL REFERENCES users(id),
    survey_id UUID NOT NULL REFERENCES surveys(id),
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    certificate_data JSONB,
    pdf_path VARCHAR(500),
    issue_date DATE DEFAULT CURRENT_DATE,
    is_valid BOOLEAN DEFAULT true,
    verification_token VARCHAR(255) UNIQUE,
    downloaded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 5. AUDIT AND LOGGING TABLES

```sql
-- Audit log for all system activities
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Test attempt tracking
CREATE TABLE test_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    survey_id UUID NOT NULL REFERENCES surveys(id),
    attempt_number INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    score DECIMAL(5,2),
    pass_status BOOLEAN,
    attempted_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, survey_id, attempt_number)
);
```

### 6. SYSTEM CONFIGURATION TABLES

```sql
-- System settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    setting_type VARCHAR(20) DEFAULT 'string',
    description TEXT,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notification templates
CREATE TABLE notification_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name VARCHAR(100) UNIQUE NOT NULL,
    template_type VARCHAR(50) NOT NULL,
    subject_template TEXT,
    body_template TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications log
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    notification_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    read_at TIMESTAMPTZ
);
```

## Database Indexes and Constraints

```sql
-- Performance indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_parent ON users(parent_user_id);
CREATE INDEX idx_test_sessions_user ON test_sessions(user_id);
CREATE INDEX idx_test_sessions_survey ON test_sessions(survey_id);
CREATE INDEX idx_test_sessions_status ON test_sessions(status);
CREATE INDEX idx_session_questions_session ON session_questions(session_id);
CREATE INDEX idx_session_questions_question ON session_questions(question_id);
CREATE INDEX idx_test_results_user ON test_results(user_id);
CREATE INDEX idx_test_results_survey ON test_results(survey_id);
CREATE INDEX idx_questions_survey ON questions(survey_id);
CREATE INDEX idx_questions_section ON questions(section_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- Row Level Security policies would be added here for multi-tenant security
```

## Data Relationships Summary

1. **Hierarchical User Structure**: Users have parent-child relationships for jurisdiction management
2. **Survey-Question Relationship**: One-to-many relationship between surveys and questions
3. **Session Management**: Each test session tracks user progress and state
4. **Result Tracking**: Results are linked to sessions and include detailed scoring
5. **Audit Trail**: Complete logging of all system activities
6. **Certificate Management**: Automated certificate generation and verification