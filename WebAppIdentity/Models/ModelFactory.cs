﻿using System.Net.Http;
using System.Web.Http.Routing;
using WebAppIdentity.IdentityProvider;

namespace WebAppIdentity.Models
{
	public class ModelFactory
	{
		private readonly UrlHelper _urlHelper;
		private readonly ApplicationUserManager _appUserManager;

		public ModelFactory(HttpRequestMessage request, ApplicationUserManager appUserManager)
		{
			_urlHelper = new UrlHelper(request);
			_appUserManager = appUserManager;
		}

		public UserReturnModel Create(ApplicationUser appUser)
		{
			return new UserReturnModel
			{
				Url = _urlHelper.Link("GetUserById", new { id = appUser.Id }),
				Id = appUser.Id,
				UserName = appUser.UserName,
				FullName = string.Format("{0} {1}", appUser.FirstName, appUser.LastName),
				Email = appUser.Email,
				EmailConfirmed = appUser.EmailConfirmed,
				Level = appUser.Level,
				JoinDate = appUser.JoinDate,
				Roles = _appUserManager.GetRolesAsync(appUser.Id).Result,
				Claims = _appUserManager.GetClaimsAsync(appUser.Id).Result
			};
		}
	}
}