const mapping: Record<string, string> = {
  'health-plans': 'health_plan',
  organizations: 'organization',
  progresses: 'progress',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
