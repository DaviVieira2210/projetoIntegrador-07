package com.dagleProject.dagle.service;

import java.nio.charset.Charset;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.binary.Base64;

import com.dagleProject.dagle.model.Usuario;
import com.dagleProject.dagle.model.UsuarioLogin;
import com.dagleProject.dagle.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository repository;
	
	public Optional<Usuario> CadastrarUsuario(Usuario usuario) {
		if(repository.findByEmail(usuario.getEmail()).isPresent())
		return null;
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		String senhaEncoder = encoder.encode(usuario.getSenha());
		usuario.setSenha(senhaEncoder);
		return Optional.of(repository.save(usuario));	
	}
	
	public Optional<UsuarioLogin> Logar(Optional<UsuarioLogin> user){
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional<Usuario> usuario = repository.findByEmail(user.get().getEmail());
		
		if(usuario.isPresent()) {
			if(encoder.matches(user.get().getSenha(), usuario.get().getSenha())){
				
				String auth = user.get().getEmail() + ":" + user.get().getSenha();
				byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader = "Basic " + new String (encodedAuth);
				
				user.get().setToken(authHeader);
				user.get().setNome(usuario.get().getNome());
				user.get().setSenha(usuario.get().getSenha());
				user.get().setEmail(usuario.get().getEmail());
				user.get().setId(usuario.get().getId());
				user.get().setTipo(usuario.get().getTipo());
				
				return user;
			}
		}
		

		return null;
	}
}
