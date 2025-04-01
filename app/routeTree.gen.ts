import { Route as rootRoute } from './routes/__root'
import { Route as TeamImport } from './routes/team'
import { Route as SermonsImport } from './routes/sermons'
import { Route as MusicImport } from './routes/music'
import { Route as EventsImport } from './routes/events'
import { Route as DonateImport } from './routes/donate'
import { Route as ContactImport } from './routes/contact'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'

const TeamRoute = TeamImport.update({
  id: '/team',
  path: '/team',
  getParentRoute: () => rootRoute,
} as any)

const SermonsRoute = SermonsImport.update({
  id: '/sermons',
  path: '/sermons',
  getParentRoute: () => rootRoute,
} as any)

const MusicRoute = MusicImport.update({
  id: '/music',
  path: '/music',
  getParentRoute: () => rootRoute,
} as any)

const EventsRoute = EventsImport.update({
  id: '/events',
  path: '/events',
  getParentRoute: () => rootRoute,
} as any)

const DonateRoute = DonateImport.update({
  id: '/donate',
  path: '/donate',
  getParentRoute: () => rootRoute,
} as any)

const ContactRoute = ContactImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/contact': {
      id: '/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactImport
      parentRoute: typeof rootRoute
    }
    '/donate': {
      id: '/donate'
      path: '/donate'
      fullPath: '/donate'
      preLoaderRoute: typeof DonateImport
      parentRoute: typeof rootRoute
    }
    '/events': {
      id: '/events'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof EventsImport
      parentRoute: typeof rootRoute
    }
    '/music': {
      id: '/music'
      path: '/music'
      fullPath: '/music'
      preLoaderRoute: typeof MusicImport
      parentRoute: typeof rootRoute
    }
    '/sermons': {
      id: '/sermons'
      path: '/sermons'
      fullPath: '/sermons'
      preLoaderRoute: typeof SermonsImport
      parentRoute: typeof rootRoute
    }
    '/team': {
      id: '/team'
      path: '/team'
      fullPath: '/team'
      preLoaderRoute: typeof TeamImport
      parentRoute: typeof rootRoute
    }
  }
}

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/donate': typeof DonateRoute
  '/events': typeof EventsRoute
  '/music': typeof MusicRoute
  '/sermons': typeof SermonsRoute
  '/team': typeof TeamRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/donate': typeof DonateRoute
  '/events': typeof EventsRoute
  '/music': typeof MusicRoute
  '/sermons': typeof SermonsRoute
  '/team': typeof TeamRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/contact': typeof ContactRoute
  '/donate': typeof DonateRoute
  '/events': typeof EventsRoute
  '/music': typeof MusicRoute
  '/sermons': typeof SermonsRoute
  '/team': typeof TeamRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/contact'
    | '/donate'
    | '/events'
    | '/music'
    | '/sermons'
    | '/team'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/contact'
    | '/donate'
    | '/events'
    | '/music'
    | '/sermons'
    | '/team'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/contact'
    | '/donate'
    | '/events'
    | '/music'
    | '/sermons'
    | '/team'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  ContactRoute: typeof ContactRoute
  DonateRoute: typeof DonateRoute
  EventsRoute: typeof EventsRoute
  MusicRoute: typeof MusicRoute
  SermonsRoute: typeof SermonsRoute
  TeamRoute: typeof TeamRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  ContactRoute: ContactRoute,
  DonateRoute: DonateRoute,
  EventsRoute: EventsRoute,
  MusicRoute: MusicRoute,
  SermonsRoute: SermonsRoute,
  TeamRoute: TeamRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()