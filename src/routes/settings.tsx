"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Container } from "../components/layout/Container"
import { PageHeader } from "../components/layout/PageHeader"
import { useTheme } from "../components/theme-provider"
import { User, Bell, CreditCard, Shield, Globe, Moon, Sun, Save } from "lucide-react"
import { cn } from "../lib/cn"

export function Settings() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  })

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Acme Inc",
    timezone: "UTC-8",
  })

  const settingSections = [
    {
      id: "profile",
      title: "Profile Settings",
      icon: User,
      description: "Manage your personal information and preferences",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      description: "Configure how you receive updates and alerts",
    },
    {
      id: "billing",
      title: "Billing & Plans",
      icon: CreditCard,
      description: "Manage your subscription and payment methods",
    },
    {
      id: "security",
      title: "Security",
      icon: Shield,
      description: "Password, two-factor authentication, and security settings",
    },
  ]

  const [activeSection, setActiveSection] = useState("profile")

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <input
            type="text"
            value={profile.company}
            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Timezone</label>
          <select
            value={profile.timezone}
            onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="UTC-8">Pacific Time (UTC-8)</option>
            <option value="UTC-5">Eastern Time (UTC-5)</option>
            <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
            <option value="UTC+1">Central European Time (UTC+1)</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
            <div>
              <h4 className="font-medium capitalize">{key} Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive {key} notifications for important updates</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, [key]: !value })}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                value ? "bg-primary" : "bg-gray-200 dark:bg-gray-700",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  value ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <div className="bg-accent/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Pro Plan</h3>
            <p className="text-muted-foreground">$29/month</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
            Active
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Next billing date: January 15, 2024</p>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Upgrade Plan
          </button>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 bg-accent/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full text-xs font-medium">
              Disabled
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security to your account</p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Enable 2FA
          </button>
        </div>

        <div className="p-4 bg-accent/50 rounded-lg">
          <h4 className="font-medium mb-2">Change Password</h4>
          <p className="text-sm text-muted-foreground mb-3">Last changed 3 months ago</p>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSettings()
      case "notifications":
        return renderNotificationSettings()
      case "billing":
        return renderBillingSettings()
      case "security":
        return renderSecuritySettings()
      default:
        return renderProfileSettings()
    }
  }

  return (
    <Container>
      <PageHeader title="Settings" subtitle="Manage your account preferences and configuration">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span className="text-sm">Theme:</span>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex items-center space-x-2 px-3 py-1.5 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="capitalize">{theme}</span>
          </button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-1"
        >
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
            <nav className="space-y-2">
              {settingSections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors",
                    activeSection === section.id ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                  )}
                >
                  <section.icon className="w-5 h-5" />
                  <div>
                    <p className="font-medium text-sm">{section.title}</p>
                  </div>
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {settingSections.find((s) => s.id === activeSection)?.title}
              </h2>
              <p className="text-muted-foreground">
                {settingSections.find((s) => s.id === activeSection)?.description}
              </p>
            </div>

            {renderContent()}

            <div className="flex justify-end pt-6 border-t border-border mt-6">
              <button className="flex items-center space-x-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  )
}
