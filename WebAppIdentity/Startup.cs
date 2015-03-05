﻿using System;
using System.Configuration;
using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using Owin;
using WebAppIdentity.IdentityProvider;
using WebAppIdentity.OAuth2ResourceOwner;

[assembly: OwinStartup(typeof(WebAppIdentity.Startup))]

namespace WebAppIdentity
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var httpConfig = new HttpConfiguration();

			ConfigureOAuthTokenGeneration(app);

			ConfigureOAuthTokenConsumption(app);

			ConfigureWebApi(httpConfig);

			app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

			app.UseWebApi(httpConfig);

		}

		private void ConfigureWebApi(HttpConfiguration config)
		{
			config.MapHttpAttributeRoutes();

		}

		private void ConfigureOAuthTokenGeneration(IAppBuilder app)
		{
			// Configure the db context and user manager to use a single instance per request
			app.CreatePerOwinContext(ApplicationDbContext.Create);
			app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

			var oAuthServerOptions = new OAuthAuthorizationServerOptions()
			{
				//For Dev enviroment only (on production should be AllowInsecureHttp = false)
				AllowInsecureHttp = true,
				TokenEndpointPath = new PathString("/oauth/token"),
				AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
				Provider = new CustomOAuthProvider(),
				AccessTokenFormat = new CustomJwtFormat("http://localhost:5768")
			};

			// OAuth 2.0 Bearer Access Token Generation
			app.UseOAuthAuthorizationServer(oAuthServerOptions);
		}

		private void ConfigureOAuthTokenConsumption(IAppBuilder app)
		{

			var issuer = "http://localhost:5768";
			string audienceId = ConfigurationManager.AppSettings["as:AudienceId"];
			byte[] audienceSecret = TextEncodings.Base64Url.Decode(ConfigurationManager.AppSettings["as:AudienceSecret"]);

			// Api controllers with an [Authorize] attribute will be validated with JWT
			app.UseJwtBearerAuthentication(
				new JwtBearerAuthenticationOptions
				{
					AuthenticationMode = AuthenticationMode.Active,
					AllowedAudiences = new[] { audienceId },
					IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                    {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, audienceSecret)
                    }
				});
		}
	}
}
