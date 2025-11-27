import { Link } from '@tanstack/react-router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { Badge } from '../ui/badge'

const menus = [
  {
    title: 'Analytics',
    badge: 'version 1.0',
    feature: {
      title: 'Serofreim Analytics',
      href: '/analytics',
      description: "Easy to setup analytics for your Ren'Py visual novels.",
    },
    links: [
      {
        title: 'Getting Started',
        href: '/docs/analytics/getting-started',
        description:
          'How to get your game api key and install the analytics sdk.',
      },
      {
        title: 'Custom Tracking',
        href: '/docs/analytics/custom-tracking',
        description: 'How to track custom events in your visual novel.',
      },
      {
        title: 'Dashboard',
        href: '/dashboard/analytics',
        description: 'View your game analytics and metrics in our dashboard.',
      },
    ],
  },
  {
    title: 'Systems',
    badge: 'Coming Soon',
    feature: {
      title: 'Serofreim Systems',
      href: '/systems',
      description: "Ren'Py systems to speed up your development.",
    },
    links: [
      {
        title: 'Roadmap',
        href: '/systems/roadmap',
        description:
          'See what systems we are working on and plan to release in the future.',
      },
      {
        title: 'Studio',
        href: '/systems/studio',
        description: 'Visual drag and drop editor for our systems.',
      },
    ],
  },
]

const menu_links = [
  { title: 'Documentation', href: '/docs' },
  { title: 'Pricing', href: '/pricing' },
]

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {menus.map((menu) => (
          <NavigationMenuItem key={menu.title}>
            <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="relative from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                      href={menu.feature.href}
                    >
                      {menu.badge && (
                        <Badge
                          variant="secondary"
                          className="absolute top-2 right-2"
                        >
                          {menu.badge}
                        </Badge>
                      )}
                      <div className="mb-2 text-lg font-medium sm:mt-4">
                        {menu.feature.title}
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        {menu.feature.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {menu.links.map((link) => (
                  <ListItem
                    key={link.title}
                    href={link.href}
                    title={link.title}
                  >
                    {link.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        {menu_links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to={link.href}>{link.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
