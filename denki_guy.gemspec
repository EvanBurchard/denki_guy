# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{denki_guy}
  s.version = "0.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Evan Burchard"]
  s.date = %q{2011-02-15}
  s.email = %q{evan.burchard@gmail.com}
  s.extra_rdoc_files = ["README.markdown"]
  s.files = ["README.markdown", "lib/rpg_generator.rb", "lib/templates/8x8s.png", "lib/templates/buttons.png", "lib/templates/cels.png", "lib/templates/debugfont.png", "lib/templates/dpad.png", "lib/templates/dpad320.png", "lib/templates/font.png", "lib/templates/fontbig.png", "lib/templates/game.css", "lib/templates/game.js", "lib/templates/game_controller.rb", "lib/templates/gamecycle.js", "lib/templates/gbox.js", "lib/templates/help.js", "lib/templates/init_game.js", "lib/templates/iphopad.js", "lib/templates/jquery.js", "lib/templates/level_template.js", "lib/templates/map_template.js", "lib/templates/npc_template.js", "lib/templates/padbg.png", "lib/templates/resources.js", "lib/templates/settings_template.js", "lib/templates/tool.js", "lib/templates/toys.js", "lib/templates/trigo.js", "lib/USAGE"]
  s.homepage = %q{http://github.com/evanburchard/denki_guy}
  s.rdoc_options = ["--main", "README.markdown"]
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.3.7}
  s.summary = %q{An rpg generator for rails}

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end
