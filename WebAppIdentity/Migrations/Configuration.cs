using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebAppIdentity.IdentityProvider;
using WebAppIdentity.Models;

namespace WebAppIdentity.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<WebAppIdentity.IdentityProvider.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

		protected override void Seed(WebAppIdentity.IdentityProvider.ApplicationDbContext context)
        {
			var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

			var user = new ApplicationUser()
			{
				UserName = "damien",
				Email = "damien_bod@hotmail.com",
				EmailConfirmed = true,
				FirstName = "damien",
				LastName = "damien",
				Level = 1,
				JoinDate = DateTime.Now.AddYears(-3)
			};

			manager.Create(user, "damien");
        }
    }
}
