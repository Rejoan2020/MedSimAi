import {
    BarChart3,
    Bell,
    CircleHelp,
    Eye,
    FileText,
    History,
    LayoutDashboard,
    Megaphone,
    ShieldCheck,
    Stethoscope,
    Users,
} from 'lucide-react'

export function getMenu(variant, isAdmin) {
    if (variant === 'admin') {
        return [
            { icon: BarChart3, title: 'Overview', link: '/admin-dashboard', exact: true },
            { icon: FileText, title: 'Cases', link: '/admin-dashboard/cases' },
            { icon: Megaphone, title: 'Announcements', link: '/admin-dashboard/announcements' },
            { icon: CircleHelp, title: 'Help & FAQ', link: '/admin-dashboard/faq' },
            { icon: Users, title: 'Users', link: '/admin-dashboard/users' },
            { icon: Eye, title: 'Student view', link: '/dashboard' },
        ]
    }
    return [
        { icon: LayoutDashboard, title: 'Dashboard', link: '/dashboard' },
        { icon: Stethoscope, title: 'Cases', link: '/cases' },
        { icon: History, title: 'My attempts', link: '/attempts' },
        { icon: Bell, title: 'Announcements', link: '/announcements' },
        { icon: CircleHelp, title: 'Help & FAQ', link: '/help&faq' },
        ...(isAdmin ? [{ icon: ShieldCheck, title: 'Admin', link: '/admin-dashboard' }] : []),
    ]
}

export function isActive(pathname, item) {
    return item.exact
        ? pathname === item.link
        : pathname === item.link || pathname.startsWith(`${item.link}/`)
}
