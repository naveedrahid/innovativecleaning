export const ROUTES = {
  PROTECTED: ['/dashboard', '/account', '/admin'],
  PUBLIC_ONLY: ['/login', '/register'],
  ROLE_BASED: {
    '/admin': 'admin',
    '/moderator': 'moderator',
  }
}