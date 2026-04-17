# 📝 Blog — Full-Stack Programming Blog Platform

> A modern, full-stack blogging platform built for developers. Features a rich editorial workflow with role-based access, post lifecycle management, and a powerful rich text editor.

---

## ✨ Features

- 🔐 **Authentication** — Secure credential-based login and session management
- 📄 **Post Management** — Full CRUD: create, edit, and delete posts
- 🔄 **Post Lifecycle** — Structured status flow with role-based transitions (see below)
- ✍️ **Rich Text Editor** — TipTap-powered editor with formatting, embeds, and more
- 🛡️ **Role-Based Access Control** — Different capabilities for authors, editors, and admins
- 👤 **User Management** — Admin panel for managing user accounts and roles

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework with SSR/SSG |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [TanStack Query](https://tanstack.com/query) | Server state management |
| [react-hook-form](https://react-hook-form.com/) | Form handling |
| [Zod](https://zod.dev/) | Schema validation |
| [shadcn/ui](https://ui.shadcn.com/) | UI component library |
| [TipTap](https://tiptap.dev/) | Rich text editor |

### Backend
> Separate repository — built with **Spring Boot** · [GitHub](https://github.com/TomosZZZ/blog-api)

---

## Gallery

# Home page
<img width="2879" height="1477" alt="Zrzut ekranu 2026-03-24 124508" src="https://github.com/user-attachments/assets/c2a0051e-deee-4f9b-ab99-bfbec76d9ded" />

# Posts page
<img width="2879" height="1426" alt="Zrzut ekranu 2026-03-24 124456" src="https://github.com/user-attachments/assets/affedd10-eeac-42c8-8dd9-33d8642f914c" />

# Post creation page
<img width="2879" height="1409" alt="Zrzut ekranu 2026-03-24 122954" src="https://github.com/user-attachments/assets/3b19ebb5-06a7-4fc4-a958-83361d046aee" />

# Post edition page
<img width="2879" height="1403" alt="Zrzut ekranu 2026-03-24 124752" src="https://github.com/user-attachments/assets/0dc60ee7-7751-4cab-92c5-14ed7da3b81a" />

# Admin posts management page
<img width="2877" height="1169" alt="Zrzut ekranu 2026-03-24 124537" src="https://github.com/user-attachments/assets/33984d5c-827a-47dd-931c-301cc8cad4ea" />


## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm / yarn / pnpm
- Running instance of the [backend API](#) *(link your Spring Boot repo here)*

### Installation

```bash
# Clone the repository
git clone https://github.com/TomosZZZ/blog.git
cd blog

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Running Locally

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📐 Post Lifecycle

```
[DRAFT] ──▶ [IN_REVIEW] ──▶ [APPROVED] ──▶ [PUBLISHED]
                 │
                 ▼
          [CHANGES_REQ]
                 │
                 ▼
            [DRAFT]
```

---

## 👥 Roles & Permissions

| Action | Author | Editor | Admin |
|---|:---:|:---:|:---:|
| Create post | ✅ | ✅ | ✅ |
| Edit own post | ✅ | ✅ | ✅ |
| Edit any post | ❌ | ✅ | ✅ |
| Publish post | ❌ | ✅ | ✅ |
| Delete post | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |

---

## 🗺️ Roadmap

- [ ] Comment system
- [ ] Post tagging and categories
- [ ] Search functionality
- [ ] Email notifications on status change
- [ ] Image upload support
- [ ] Light mode

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

---

## 📬 Contact

**Tomasz Okniński** — [LinkedIn](https://www.linkedin.com/in/tomasz-okninski/) · [GitHub](https://github.com/TomosZZZ)

---

## 📄 License

This project is licensed under the MIT License.
