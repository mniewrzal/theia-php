/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, ContainerModule } from "inversify";
import { BaseLanguageServerContribution, LanguageServerContribution, IConnection } from "theia-core/lib/languages/node";


export default new ContainerModule(bind => {
    bind<LanguageServerContribution>(LanguageServerContribution).to(PHPContribution);
});

const BIN = '/home/wywrzal/git/theia-php/theia-php-extension/vendor/felixfbecker/language-server/bin/php-language-server.php'

@injectable()
class PHPContribution extends BaseLanguageServerContribution {

    readonly id = "php";
    readonly name = "PHP";

    start(clientConnection: IConnection): void {
        const command = 'php';
        const args: string[] = [
            BIN
        ];
        const serverConnection = this.createProcessStreamConnection(command, args);
        this.forward(clientConnection, serverConnection);
    }

    protected onDidFailSpawnProcess(error: Error): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting python language server.")
        console.error("Please make sure it is installed on your system.")
        console.error("Use the following command: 'pip install https://github.com/palantir/python-language-server/archive/master.zip'")
    }

}



