export default {
  items: [
    {
      name: 'Dashboard',
      url: 'dashboard',
      icon: 'icon icon-home'
    },
    {
      name: 'Roles & Permissions',
      url: '/roles',
      icon: 'fa fa-user-times',
      permission:'role-list'
    },
    {
      name: 'Employees',
      url: '/employees',
      icon: 'fa fa-users',
      permission:'employee-list'
    },
    {
      name: 'News',
      url: '/news',
      icon: 'fa fa-newspaper',
      permission:'news-list'
    },
    {
      name: 'Companies',
      url: '/companies',
      icon: 'fa fa-building',
      permission:'company-lists'
    },
    {
      name: 'Statments',
      url: '/statments',
      icon: 'fa fa-money-check-alt',
      permission:'statement-list'
    },
    {
      name: 'Projects',
      url: '/projects',
      icon: 'fa fa-project-diagram',
      permission:'project-list'
    },
    {
      name: 'Profit & Loss Statement',
      url: '#',
      icon: 'fa fa-asterisk',
      permission:'role-lists',
      items: [
        {
          name: 'SR7 Statement',
          url: '/sr7Statement',
        }
      ]
    },
    
    {
      name: 'Settings',
      url: '/settings',
      icon: 'fa fa-cog',
      permission:'setting-list'
    },
    {
      name: 'Offtime',
      url: '/employee/offtime',
      icon: 'fas fa-clock',
      permission:'isEmployee'
    },
    {
      name: 'Goals',
      url: '/employee/goals',
      icon: 'fas fa-tasks',
      permission:'isEmployee'
    },
    {
      name: 'Projects',
      url: '/employee/projects',
      icon: 'fa fa-project-diagram',
      permission:'isEmployee'
    },
    {
      name: 'Logout',
      url: '/logout',
      icon: 'icon-signout'
    }
  ],
};
