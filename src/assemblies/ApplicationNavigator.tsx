import React, { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultNavigator } from '../layouts/helium/Navigator';
import { Link } from 'react-router-dom';
import { Navigator } from '../layouts/helium/Helium';


//
// ApplicationNavigator
//

interface Item {
    name: string,
    to: string
}

interface Group {
    name: string,
    items: Item[]
}

export interface Props {
    items: (Group | Item)[],
    onSupport: () => void
}

export const ApplicationNavigator: FC<Props> = ({ items, onSupport, children }) => {

    const { t, ready } = useTranslation();

    return (
        <>

            <Navigator.Content className="p-3">
                <DefaultNavigator className="-mx-3">

                    {ready && items.map((i) => (
                        (i as Group).items ?
                            <Fragment key={i.name} >
                                <DefaultNavigator.Group>{t(i.name)}</DefaultNavigator.Group>
                                {(i as Group).items.map((j) =>
                                    <Link to={j.to}>
                                        <DefaultNavigator.Item key={j.name} active={false}>{t(j.name)}</DefaultNavigator.Item>
                                    </Link>
                                )}
                            </Fragment>
                            :
                            <Link to={(i as Item).to}>
                                <DefaultNavigator.Item active={false}>{t(i.name)}</DefaultNavigator.Item>
                            </Link>
                    ))}

                    {children}

                </DefaultNavigator>
            </Navigator.Content>

            <Navigator.Footer className="px-3 py-2">
                <div onClick={onSupport} className="flex flex-row items-center justify-between cursor-pointer">
                    <div>
                        <div className="">Soporte</div>
                        <div className="text-xs text-muted">Solicita ayuda aquí</div>
                    </div>
                    <div className="w-6 text-center rounded-full bg-navigator text-navigator-bg">?</div>
                </div>
            </Navigator.Footer>

            <Navigator.Footer className="px-3 py-2">
                <div className="text-xs text-muted">© 2020 Nimbox Technologies LTD</div>
            </Navigator.Footer>

        </>
    );

};
