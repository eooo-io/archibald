# Archibald - Public Release Plan

## Current State Assessment

**Archibald** is an early-stage (v0.0.0, 13 commits) cloud architecture visualization tool built with React 18, TypeScript, and Vite. It provides a drag-and-drop editor using React Flow for creating cloud infrastructure diagrams.

### What Works Today
- Drag-and-drop canvas with React Flow (basic 2D)
- Basic isometric/2D toggle (CSS transform only, not true 3D)
- 20+ AWS service nodes (EC2, Lambda, RDS, S3, VPC, etc.)
- Property editing panel for each service type
- Input validation (IP, CIDR, ports, hostnames, AMI IDs, etc.)
- Design save/load to localStorage with auto-save
- JSON import/export
- Dark/light mode
- Docker dev environment
- CI pipeline (lint + build, no tests)

### What's Missing for Public Release
- No backend, no persistence beyond localStorage
- No authentication or user accounts
- No GCP or Azure providers (only AWS)
- No infrastructure-as-code generation (Terraform, CloudFormation, etc.)
- No true 2D/3D canvas with layered views
- Zero test coverage
- No real-time collaboration
- Outdated dependencies (React 18 vs 19, Chakra v2 vs v3)
- No error boundaries or production error handling
- Hardcoded localhost URLs
- Unused dependencies (@aws-amplify/ui-react)

---

## Release Plan - Phased Approach

### Phase 0: Foundation & Cleanup (Weeks 1-3)

**Goal:** Stabilize the codebase, remove dead code, modernize dependencies.

| Task | Details |
|------|---------|
| Remove unused deps | Drop `@aws-amplify/ui-react`, unused components (CloudComponentNode, DiagramCanvas, ComponentPalette) |
| Fix hardcoded URLs | Externalize `localhost:5174` guide link to env variable |
| Add error boundaries | Wrap app in React Error Boundary for graceful failure |
| Dependency updates | Update React 18→19, Chakra v2→v3, Zustand v4→v5, React Router v6→v7, Framer Motion v10→v12 |
| Actually use Zustand | Migrate from raw localStorage to Zustand store with localStorage persistence middleware |
| Refactor PropertiesPanel | Break the 39KB/1195-line monolith into per-service-type sub-components |
| Add testing framework | Install Vitest + React Testing Library + Playwright for e2e |
| Write initial tests | Unit tests for validation utils, component rendering, store logic |
| Fix CI pipeline | Add working `typecheck` and `test` npm scripts, remove graceful test failures |

---

### Phase 1: Canvas Overhaul - 2D & Isometric 3D (Weeks 4-8)

**Goal:** Replace the current basic React Flow canvas with a proper dual-mode rendering engine supporting 2D flat view and isometric 3D layered view.

#### 1a. 2D Canvas (Weeks 4-5)

| Task | Details |
|------|---------|
| Upgrade React Flow | Move to `@xyflow/react` v12 (successor to `reactflow` v11) for better performance and extensibility |
| Implement proper 2D grid | Snap-to-grid, alignment guides, ruler overlays |
| Group nodes by layer | Visual grouping for VPC → Subnet → Instance hierarchy |
| Connection validation | Enforce valid connections between service types (e.g., EC2 can connect to RDS but not directly to Route53) |
| Multi-select & bulk ops | Select multiple nodes, move/delete/copy as group |
| Undo/Redo | Command pattern for full undo/redo stack |
| Minimap improvements | Show service-type-colored minimap nodes |
| Keyboard shortcuts | Delete, copy/paste, zoom, pan, undo/redo |

#### 1b. Isometric 3D Layered View (Weeks 6-8)

| Task | Details |
|------|---------|
| Rendering engine | Use a custom isometric renderer (CSS 3D transforms + SVG) or integrate a library like `pixi.js` / `three.js` (orthographic camera) for the isometric view |
| Vertical layer system | Define infrastructure layers: **Networking** (bottom) → **Compute** (middle) → **Application** (top) → **CDN/Edge** (topmost) |
| Layer definitions | Each cloud service maps to a specific layer (e.g., VPC/Subnet → Networking, EC2/EKS → Compute, Lambda/API GW → Application, CloudFront/Route53 → Edge) |
| Layer visibility | Toggle individual layers on/off, adjust opacity, expand/collapse vertical spacing |
| Cross-layer connections | Draw connections between layers with 3D-aware edge routing |
| View toggle | Seamless switch between 2D flat and isometric 3D with animated transition |
| Zoom & pan in 3D | Orbit-style controls for the isometric view (rotate limited to isometric angles, zoom, pan) |
| Layer-aware drag & drop | When dropping a component, auto-assign to correct layer based on service type; allow manual layer override |

**Proposed Layer Architecture:**

```
Layer 4 (Top):     CDN / Edge         — CloudFront, Route53, WAF
Layer 3:           Application        — Lambda, API Gateway, ECS Tasks, EKS Pods
Layer 2:           Compute / Data     — EC2, RDS, DynamoDB, ElastiCache, S3
Layer 1:           Networking         — VPC, Subnets, Security Groups, NAT GW, IGW, Load Balancers
Layer 0 (Base):    Account / Region   — AWS Account boundary, Region selector
```

---

### Phase 2: Multi-Cloud Providers (Weeks 9-14)

**Goal:** Add GCP and Azure providers alongside AWS, with a unified abstraction layer for hybrid architectures.

#### 2a. Provider Abstraction Layer (Week 9-10)

| Task | Details |
|------|---------|
| Define provider interface | Create a `CloudProvider` abstraction: each provider implements a standard interface for service categories (compute, networking, storage, database, security, integration, edge) |
| Service mapping | Map equivalent services across providers (e.g., EC2 ↔ Compute Engine ↔ Azure VM) |
| Provider-specific properties | Each service retains provider-specific config (e.g., AWS uses AMI IDs, GCP uses machine types, Azure uses VM sizes) |
| Icon system | Provider-branded icons for each service, plus generic icons for hybrid view |
| Color coding | Visual distinction per provider (AWS=orange, GCP=blue, Azure=cyan) on canvas |

#### 2b. GCP Provider (Weeks 10-11)

| Task | Details |
|------|---------|
| Compute | Compute Engine, Cloud Functions, GKE, Cloud Run |
| Networking | VPC, Subnets, Cloud Load Balancing, Cloud DNS, Cloud CDN, Cloud NAT, Firewall Rules |
| Storage | Cloud Storage, Persistent Disk, Filestore |
| Database | Cloud SQL, Cloud Spanner, Firestore, Memorystore, BigQuery |
| Security | IAM, Cloud KMS, Secret Manager |
| Integration | Pub/Sub, Cloud Tasks |
| Properties | GCP-specific property editors for each service |

#### 2c. Azure Provider (Weeks 12-13)

| Task | Details |
|------|---------|
| Compute | Virtual Machines, Azure Functions, AKS, Container Instances |
| Networking | VNet, Subnets, Load Balancer, Azure DNS, Front Door, NAT Gateway, NSG |
| Storage | Blob Storage, Managed Disks, Azure Files |
| Database | Azure SQL, Cosmos DB, Azure Cache for Redis |
| Security | Azure AD / Entra ID, Key Vault |
| Integration | Service Bus, Event Grid |
| Properties | Azure-specific property editors for each service |

#### 2d. Hybrid / Multi-Cloud (Week 14)

| Task | Details |
|------|---------|
| Mixed canvas | Allow nodes from multiple providers on the same diagram |
| Cross-provider connections | Draw connections between AWS, GCP, and Azure services (VPN tunnels, peering, API calls) |
| Provider selector | Global toggle to filter sidebar by provider, or show all |
| Hybrid templates | Pre-built templates for common multi-cloud patterns (e.g., AWS primary + GCP for BigQuery analytics) |
| Provider boundary nodes | Visual containers showing which resources belong to which provider/account/project |

---

### Phase 3: Infrastructure-as-Code Generation (Weeks 15-19)

**Goal:** Generate deployable IaC from diagrams — this is the killer feature that makes Archibald more than a drawing tool.

| Task | Details |
|------|---------|
| Terraform HCL generator | Convert diagram → Terraform files with proper resource definitions, variables, outputs |
| AWS CloudFormation | Generate CloudFormation YAML/JSON templates |
| GCP Deployment Manager | Generate GCP-native deployment configs |
| Azure ARM / Bicep | Generate Azure Resource Manager templates or Bicep |
| Pulumi (stretch) | Generate Pulumi TypeScript/Python code |
| Dependency resolution | Automatically order resources by dependencies (VPC before subnet before EC2) |
| Variable extraction | Detect configurable values and extract as Terraform variables / CloudFormation parameters |
| Module detection | Group related resources into Terraform modules |
| Validation | Validate generated IaC against provider schemas before export |
| Download as zip | Package generated files with proper directory structure |
| Preview pane | Show generated code in a side panel with syntax highlighting before export |

---

### Phase 4: Backend & Persistence (Weeks 20-24)

**Goal:** Move from localStorage to a real backend for persistence, sharing, and collaboration.

| Task | Details |
|------|---------|
| Backend stack | Node.js + Express/Fastify API, PostgreSQL for data, Redis for sessions/cache |
| Auth system | OAuth 2.0 (GitHub, Google login) + email/password via Passport.js or Auth0 |
| User accounts | Profile, preferences, API keys for IaC generation |
| Design storage | Server-side persistence of diagrams with versioning |
| Sharing | Public/private designs, shareable links, embed mode |
| Team workspaces | Organizations with multiple members, role-based access (viewer/editor/admin) |
| API | RESTful API for CRUD operations on designs, plus future CLI integration |
| Rate limiting | Express rate limiter on all endpoints |
| HTTPS & security headers | CSP, HSTS, X-Frame-Options, helmet.js |
| Database migrations | Knex.js or Prisma for schema management |

---

### Phase 5: Polish & Production Readiness (Weeks 25-28)

| Task | Details |
|------|---------|
| Performance | Code splitting, lazy loading, memoization, bundle analysis |
| Accessibility | ARIA labels, keyboard navigation, screen reader support, focus management |
| Responsive design | Tablet support (mobile is view-only) |
| Templates library | Pre-built architecture templates (3-tier web app, serverless API, data pipeline, etc.) |
| Onboarding | Interactive tutorial / guided tour for first-time users |
| Search | Search across services, properties, and saved designs |
| Export formats | PNG, SVG, PDF diagram export in addition to IaC |
| Monitoring | Sentry for error tracking, basic analytics |
| Documentation | Complete user guide, API docs, architecture decision records |
| E2E test suite | Playwright tests covering all critical user flows |
| Load testing | Verify performance with large diagrams (100+ nodes) |
| Security audit | OWASP checklist, dependency vulnerability scanning (Snyk/Dependabot) |

---

## Technical Architecture for the Overhaul

### Canvas Architecture (Phase 1)

```
┌──────────────────────────────────────────────┐
│                  CanvasProvider               │
│  (Context: view mode, zoom, selected nodes)  │
├──────────────────┬───────────────────────────┤
│   2D Renderer    │   Isometric 3D Renderer   │
│   (@xyflow/react)│   (Three.js ortho camera  │
│                  │    or custom SVG/CSS 3D)   │
├──────────────────┴───────────────────────────┤
│              Shared Data Model                │
│   (Zustand store: nodes, edges, layers,      │
│    viewport, selection, undo history)         │
├──────────────────────────────────────────────┤
│           Provider Abstraction                │
│   (AWS | GCP | Azure service definitions,    │
│    icons, default properties, validators,    │
│    IaC generators per service)               │
└──────────────────────────────────────────────┘
```

### Provider Plugin System

```typescript
interface CloudProvider {
  id: string;                    // 'aws' | 'gcp' | 'azure'
  name: string;
  icon: React.ComponentType;
  color: string;
  categories: ServiceCategory[];
  services: CloudService[];
  iacGenerators: {
    terraform: TerraformGenerator;
    native: NativeIaCGenerator;   // CloudFormation | Deployment Manager | ARM
  };
}

interface CloudService {
  id: string;
  name: string;
  provider: string;
  category: string;
  layer: InfraLayer;             // networking | compute | application | edge
  icon: React.ComponentType;
  defaultProperties: Record<string, unknown>;
  propertyEditor: React.ComponentType;
  validators: ValidatorFn[];
  connectionRules: ConnectionRule[];
  iacTemplate: IaCTemplate;
}
```

### Isometric Layer Model

```typescript
interface InfraLayer {
  id: string;
  name: string;
  zIndex: number;               // Vertical position in isometric view
  color: string;                // Layer tint/background
  opacity: number;              // 0-1, adjustable per layer
  visible: boolean;
  collapsed: boolean;
  serviceTypes: string[];       // Which service categories belong here
}
```

---

## Priority Order & MVP Definition

### MVP for Public Beta (Phases 0-3, ~19 weeks)
The minimum viable product for a public release that differentiates Archibald:

1. **Stable, polished 2D canvas** with proper UX (undo/redo, multi-select, keyboard shortcuts)
2. **Isometric 3D layered view** — the visual differentiator
3. **All three cloud providers** (AWS, GCP, Azure) with core services
4. **Terraform generation** — the functional differentiator
5. **Test coverage >70%** — stability guarantee
6. **localStorage persistence** is acceptable for beta (no backend needed yet)

### Post-Beta (Phases 4-5)
- Backend, auth, collaboration
- Additional IaC formats
- Templates, onboarding, polish

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Three.js/3D complexity | High | Start with CSS 3D transforms; upgrade to Three.js only if needed |
| Scope creep on providers | Medium | Launch with 8-10 core services per provider, expand later |
| Terraform generation accuracy | High | Validate against `terraform validate`; maintain test fixtures per resource type |
| React 19 migration breakage | Medium | Do it first in Phase 0 while codebase is small |
| Performance with large diagrams | Medium | Virtual rendering, memoization, Web Workers for IaC generation |

---

## Immediate Next Steps

1. Create GitHub milestones for each phase
2. Begin Phase 0 cleanup and dependency updates
3. Set up Vitest and write first tests
4. Prototype the isometric layer renderer in isolation
5. Design the `CloudProvider` interface and refactor AWS to implement it
