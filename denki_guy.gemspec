# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{denki_guy}
  s.version = "0.1.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Evan Burchard"]
  s.date = %q{2011-02-15}
  s.email = %q{evan.burchard@gmail.com}
  s.extra_rdoc_files = ["README.markdown"]
  s.files = ["README.markdown", "lib/generators/rpg/rpg_generator.rb", "lib/generators/rpg/templates/8x8s.png", "lib/generators/rpg/templates/buttons.png", "lib/generators/rpg/templates/cels.png", "lib/generators/rpg/templates/debugfont.png", "lib/generators/rpg/templates/dpad.png", "lib/generators/rpg/templates/dpad320.png", "lib/generators/rpg/templates/font.png", "lib/generators/rpg/templates/fontbig.png", "lib/generators/rpg/templates/game.css", "lib/generators/rpg/templates/game.js", "lib/generators/rpg/templates/game_controller.rb", "lib/generators/rpg/templates/gamecycle.js", "lib/generators/rpg/templates/gbox.js", "lib/generators/rpg/templates/help.js", "lib/generators/rpg/templates/init_game.js", "lib/generators/rpg/templates/iphopad.js", "lib/generators/rpg/templates/jquery.js", "lib/generators/rpg/templates/level_template.js", "lib/generators/rpg/templates/map_template.js", "lib/generators/rpg/templates/npc_template.js", "lib/generators/rpg/templates/padbg.png", "lib/generators/rpg/templates/resources.js", "lib/generators/rpg/templates/settings_template.js", "lib/generators/rpg/templates/tool.js", "lib/generators/rpg/templates/toys.js", "lib/generators/rpg/templates/trigo.js", "lib/generators/rpg/USAGE"]
  s.homepage = %q{http://github.com/evanburchard/denki_guy}
  s.rdoc_options = ["--main", "README.markdown"]
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.5.2}
  s.summary = %q{An rpg generator for rails}

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
