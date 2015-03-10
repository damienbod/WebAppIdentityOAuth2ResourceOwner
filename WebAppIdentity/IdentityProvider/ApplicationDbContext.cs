using Microsoft.AspNet.Identity.EntityFramework;
using WebAppIdentity.Models;

namespace WebAppIdentity.IdentityProvider
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
	{
		public ApplicationDbContext()
			: base("DefaultConnection", throwIfV1Schema: false)
		{
			Configuration.ProxyCreationEnabled = false;
			Configuration.LazyLoadingEnabled = false;
		}

		public static ApplicationDbContext Create()
		{
			return new ApplicationDbContext();
		}

	}
}